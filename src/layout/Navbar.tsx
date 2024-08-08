import { auth } from "@/configs/firebaseConfig";
import { AppButton } from "@/helpers/ui";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { LogOut } from "react-feather";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [applying, setApplying] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // No user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setApplying(true);
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setUser(null); // Clear user state after logout
      setApplying(false);
    } catch (error) {
      console.error("Error logging out:", error);
      setApplying(false);
    }
  };
  return (
    <div className="bg-gray-200 py-5">
      <ul className="container mx-auto flex justify-between">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <AppButton
            title="Logout"
            callBack={handleLogout}
            Icon={LogOut}
            loader={applying}
            loaderText="Logging out..."
          />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
