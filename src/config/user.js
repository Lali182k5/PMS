// Centralized default user profile for the UI.
// Returns a runtime user object (no role switching or auth metadata).
const DEFAULT_USER = {
  name: 'Dr.Likhitha Sai',
  avatar: '/images/Profile.jpeg'
};

function getRuntimeUser() {
  // No runtime overrides; always return defaults
  return DEFAULT_USER;
}

const user = getRuntimeUser();
export default user;
