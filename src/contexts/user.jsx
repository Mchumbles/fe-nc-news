// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState(() => {
//     const storedUser = localStorage.getItem("loggedInUser");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   console.log(loggedInUser);
//   useEffect(() => {
//     if (loggedInUser !== null) {
//       localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
//     } else {
//       localStorage.removeItem("loggedInUser");
//     }
//   }, [loggedInUser]);

//   const setUser = (user) => {
//     setLoggedInUser(user);
//   };

//   const clearUser = () => {
//     setLoggedInUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ loggedInUser, setUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
