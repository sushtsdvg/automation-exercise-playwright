export default function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'hotmail.com'];
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  
  // Generate a random 8-character username
  for (let i = 0; i < 8; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Pick a random domain
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
  return `${username}@${randomDomain}`;
}

console.log(generateRandomEmail());