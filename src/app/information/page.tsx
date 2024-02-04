import { Box } from "@/components/common";

const InformationPage = () => {
  return (
    <main className="w-full items-center">
      <div className="flex flex-col items-center space-y-5 py-[120px]">
        <Box className="flex flex-col items-center p-10">
          <h2 className="border-b-2 text-5xl">Soon</h2>
          <ul className="list-inside list-image-[url(/icon/marchmellow.svg)] text-2xl space-y-2">
            <li>Profile page: Manage your data including name, avatars, and meet records.</li>
            <li>Authorization with email and password, as well as other services (Reddit, GitHub, Instagram).</li>
            <li>Showing supporters avatars if registered</li>
            <li>Correcting the calculation of meet duration</li>
            <li>Add users roles (creator/guest)</li>
            <li>Kicking from room</li>
            <li>Meeting recording</li>
			<li>Roast marshmallows during a meeting</li>
          </ul>
        </Box>
        <Box className="flex flex-col items-center space-y-5 p-10">
          <h2 className="border-b-4 text-5xl border-black dark:border-white">Contact</h2>
          <div className="flex flex-col justify-center items-center text-3xl">
            <span>If you want to say something, write to: </span>
            <a href="mailto:forestmeet2@gmail.com" className="text-rose-600 hover:text-rose-700">forestmeet2@gmail.com</a>
          </div>
        </Box>
      </div>
    </main>
  );
};

export default InformationPage;
