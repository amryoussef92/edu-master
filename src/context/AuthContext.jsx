import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || '',
    user: null,
    role: null,
  });
  const [loading, setLoading] = useState(true); // ✅ Start as true

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const restoreSession = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // عمل طلب GET للـ endpoint باستخدام الـ token
        const response = await axios.get(
          'https://edu-master-delta.vercel.app/user/',
          {
            headers: {
              token: token,
            },
          }
        );

        // التحقق من نجاح الطلب
        if (response.data.success) {
          const userRole = response.data.data.role;
          console.log('✅ User role fetched:', userRole);

          // التحقق من الـ role
          switch (userRole) {
            case 'user':
              console.log('User is a regular user');
              return { role: 'user', userData: response.data.data };
            case 'admin':
              console.log('User is an admin');
              return { role: 'admin', userData: response.data.data };
            case 'super-admin':
              console.log('User is a super-admin');
              return { role: 'super-admin', userData: response.data.data };
            default:
              console.warn('⚠️ Unknown role:', userRole);
              return { role: 'unknown', userData: response.data.data };
          }
        } else {
          throw new Error(
            'Failed to fetch user data: ' + response.data.message
          );
        }
      } catch (error) {
        console.error('❌ Error fetching user role:', error.message);
        return { role: null, userData: null, error: error.message };
      }
    };
    restoreSession();
  }, []);

  const login = async (data) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(data.token);
      const email = decoded?.email;

      if (!email) {
        throw new Error('Invalid token: email not found');
      }

      localStorage.setItem('token', data.token);

      let role = 'student';

      if (email === 's_admin@gmail.com') {
        role = 'super-admin';
      } else {
        try {
          const adminRes = await axios.get(
            'https://edu-master-delta.vercel.app/admin/all-user',
            { headers: { token: data.token } }
          );
          if (adminRes.data.success) {
            role = 'admin';
          }
        } catch {
          role = 'student';
        }
      }

      setAuth({ token: data.token, user: email, role });
    } catch (err) {
      console.error('Login failed:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: '', user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
