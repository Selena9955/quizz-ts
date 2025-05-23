import React, { useState } from "react";

export default function AuthContext() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return <div>AuthContext</div>;
}
