import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';

const router = Router();
const { Client } = pg;
const db = new Client({ connectionString: process.env.DATABASE_URL });
db.connect();

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 12 * 60 * 60 * 1000, sameSite: 'lax' });
    res.json({ message: 'Logged in successfully', user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => { res.clearCookie('token'); res.json({ message: 'Logged out' }); });

export default router;
