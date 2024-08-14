'use client';
import EditableImage from "../../components/layout/EditableImage";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import UserForm from "../../components/layout/UserForm";
import UserTabs from "../../components/layout/UserTabs"
import {useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.ok)
        resolve()
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });

  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}

// 'use client';
// import EditableImage from "../../components/layout/EditableImage";
// import InfoBox from "../../components/layout/InfoBox";
// import SuccessBox from "../../components/layout/SuccessBox";
// import UserForm from "../../components/layout/UserForm";
// import UserTabs from "../../components/layout/UserTabs";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function ProfilePage() {
//   const session = useSession();

//   const [user, setUser] = useState(null); // Stores user data including profile image
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [profileFetched, setProfileFetched] = useState(false);
//   const { status } = session;

//   useEffect(() => {
//     if (status === 'authenticated') {
//       // Fetch the profile data when the user is authenticated
//       fetch('/api/profile').then(response => {
//         response.json().then(data => {
//           setUser(data); // Ensure 'user' state includes all necessary user data
//           setIsAdmin(data.admin);
//           setProfileFetched(true);
//         });
//       });
//     }
//   }, [status]);

//   async function handleProfileInfoUpdate(ev, data) {
//     ev.preventDefault();

//     const savingPromise = new Promise(async (resolve, reject) => {
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         resolve();
//       } else {
//         reject();
//       }
//     });

//     await toast.promise(savingPromise, {
//       loading: 'Saving...',
//       success: 'Profile saved!',
//       error: 'Error saving profile',
//     });

//     // Fetch the updated profile to refresh the displayed data
//     fetch('/api/profile').then(response => {
//       response.json().then(data => {
//         setUser(data); // Update the user state with the latest profile data
//       });
//     });
//   }

//   if (status === 'loading' || !profileFetched) {
//     return 'Loading...'; // Loading state while profile data is being fetched
//   }

//   if (status === 'unauthenticated') {
//     return redirect('/login'); // Redirect if the user is not authenticated
//   }

//   return (
//     <section className="mt-8">
//       <UserTabs isAdmin={isAdmin} />
//       <div className="max-w-2xl mx-auto mt-8">
//         <UserForm user={user} onSave={handleProfileInfoUpdate} />
//       </div>
//     </section>
//   );
// }
