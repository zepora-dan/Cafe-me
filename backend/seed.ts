import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcrypt';

const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function seed() {
  await client.connect();
  console.log('Starting database seeding...');
  try {
    await client.query('TRUNCATE order_items, orders, products, product_types, categories, waiters, users CASCADE');
    const salt = await bcrypt.hash('password123', 10);
    const insertUser = `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id`;
    await client.query(insertUser, ['Admin User', 'admin@cafe.com', salt, 'admin']);
    await client.query(insertUser, ['Cashier User', 'cashier@cafe.com', salt, 'cashier']);
    await client.query(insertUser, ['Kitchen Staff', 'kitchen@cafe.com', salt, 'kitchen']);
    await client.query(insertUser, ['Bar Staff', 'bar@cafe.com', salt, 'bar']);
    const insertWaiter = `INSERT INTO waiters (waiter_code, name) VALUES ($1, $2)`;
    await client.query(insertWaiter, ['W01', 'Abebe Bikila']);
    await client.query(insertWaiter, ['W02', 'Tirunesh Dibaba']);
    const insertCat = `INSERT INTO categories (name) VALUES ($1) RETURNING id`;
    const foodCatRes = await client.query(insertCat, ['Food']);
    const foodCatId = foodCatRes.rows[0].id;
    const drinkCatRes = await client.query(insertCat, ['Drinks']);
    const drinkCatId = drinkCatRes.rows[0].id;
    const insertType = `INSERT INTO product_types (category_id, name) VALUES ($1, $2) RETURNING id`;
    const tradTypeRes = await client.query(insertType, [foodCatId, 'Traditional Habesha']);
    const tradTypeId = tradTypeRes.rows[0].id;
    const fastFoodTypeRes = await client.query(insertType, [foodCatId, 'Fast Food']);
    const fastFoodTypeId = fastFoodTypeRes.rows[0].id;
    const coffeeTypeRes = await client.query(insertType, [drinkCatId, 'Coffee & Tea']);
    const coffeeTypeId = coffeeTypeRes.rows[0].id;
    const insertProd = `INSERT INTO products (type_id, name, description, price_cents) VALUES ($1, $2, $3, $4)`;
    await client.query(insertProd, [tradTypeId, 'Doro Wat', 'Spicy chicken stew', 35000]);
    await client.query(insertProd, [tradTypeId, 'Kitfo', 'Minced raw beef', 40000]);
    await client.query(insertProd, [tradTypeId, 'Beyaynetu', 'Vegetarian combo', 25000]);
    await client.query(insertProd, [fastFoodTypeId, 'Beef Burger', 'With fries', 22000]);
    await client.query(insertProd, [coffeeTypeId, 'Buna', 'Traditional coffee', 4000]);
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}
seed();
