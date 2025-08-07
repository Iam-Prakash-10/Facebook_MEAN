const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (authError) throw authError;

    // Create user profile in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert([{ id: authData.user.id, username, email }]);

    if (profileError) throw profileError;

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const { data: profile } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    res.json({
      token: session.access_token,
      user: {
        id: user.id,
        email: user.email,
        username: profile.username
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router; 