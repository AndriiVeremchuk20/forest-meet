
const ProfileForm = () => {

  return (
    <form>
	  <div>
        <input id="avatar" type="file" />
      </div>

      <div>
        <label htmlFor="name">Name :</label>
        <input id="name" type="text" />
      </div>
    </form>
  );
};

export default ProfileForm;
