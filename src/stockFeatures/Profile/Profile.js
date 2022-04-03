import { useState, useEffect } from 'react';
import { useAuthContext } from '../../features/Auth/Auth.context';
import styles from '../../mcss/Profile.module.css';

export function Profile() {
  const { user, token, trackedItems, setUserAfterEdit } = useAuthContext();
  const [enable, setEnable] = useState('none');
  const [usertoRender, setUserToRender] = useState(user);
  const [formValues, setFormValues] = useState({
    id: usertoRender.id,
    firstName: usertoRender.firstName,
    lastName: usertoRender.lastName,
    email: usertoRender.email,
    profilePhoto: usertoRender.profilePhoto,
  });
  const [errors, setErrors] = useState({
    serverError: '',
  });

  useEffect(() => {
    setUserToRender(user);
  }, [user]);

  async function addToLocalStorage() {
    const response = window.confirm('Agree editing your profile');
    if (response) {
      const data = await fetch(
        `http://localhost:3005/users/${usertoRender.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        }
      ).then((res) => res.json());
      if (!data.email) {
        setErrors({
          ...errors,
          serverError: 'A server error has occured please try again',
        });
        return;
      }
      localStorage.setItem('user', JSON.stringify(formValues));
      setEnable('none');
      setUserAfterEdit(formValues);
    }
  }

  function tracked() {
    if (!trackedItems) {
      return;
    }
    return trackedItems.items.map((elem) => <p key={elem}>{elem}</p>);
  }
  async function enableEdit() {
    setEnable('show');
  }

  async function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleEdit(e) {
    e.preventDefault();
    addToLocalStorage();
    setErrors({ ...errors, serverError: '' });
  }

  return (
    <>
      <div className={styles.user}>
        <img
          className={styles.profile_img}
          src={usertoRender.profilePhoto}
          alt="user description"
        />
        <p className={styles.editDetails} onClick={enableEdit}>
          {usertoRender.firstName}
        </p>
        <p>{usertoRender.lastName}</p>
        <p>{usertoRender.email}</p>
      </div>
      <p>Tracked items</p>
      <div className={styles.tracked}>{tracked()}</div>
      <form onSubmit={handleEdit} className={styles[enable]}>
        <div className={`my-2 ${styles.my_style}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            id="email"
            className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
          />
        </div>

        <div className={`my-2 ${styles.my_style}`}>
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            id="firstName"
            className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
          />
        </div>
        <div className={`my-2 ${styles.my_style}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            id="lastName"
            className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
          />
        </div>
        <div className={`my-2 ${styles.my_style}`}>
          <label htmlFor="profilePhoto">Profile photo</label>
          <input
            type="text"
            name="profilePhoto"
            value={formValues.profilePhoto}
            onChange={handleInputChange}
            id="profilePhoto"
            className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
          />
        </div>

        {errors.serverError && (
          <p className="bg-red-200 text-red-900 bold p-2">
            {errors.serverError}
          </p>
        )}
        <p className="my-2">
          <button
            type="submit"
            className={`rounded-md bg-slate-900 text-slate-100 py-2 px-2 ${styles.submitFirst}`}
          >
            {'Submit'}
          </button>
        </p>
      </form>
    </>
  );
}
