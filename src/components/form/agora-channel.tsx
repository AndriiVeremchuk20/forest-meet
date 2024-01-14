import { useRouter } from "next/navigation";
import React, { useState, type FormEvent } from "react";

const AgoraChannelForm: React.FC = () => {
  const router = useRouter();
  const [uid, setUid] = useState<number | "">("");
  const [channelName, setChannelName] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { uid, channelName, token });
    router.push(`/meet/room?id=${channelName}&token=${token}&uid=${uid}`);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-6 text-black shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-white">
            UID:
          </label>
          <input
            type="number"
            placeholder="Enter UID"
            className="w-full rounded border border-gray-600 p-2 focus:border-blue-500 focus:outline-none"
            value={uid}
            onChange={(e) => setUid(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-white">
            Channel Name:
          </label>
          <input
            type="text"
            placeholder="Enter channel name"
            className="w-full rounded border border-gray-600 p-2 focus:border-blue-500 focus:outline-none"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-white">
            Token:
          </label>
          <textarea
            placeholder="Enter token"
            className="w-full rounded border border-gray-600 p-2 focus:border-blue-500 focus:outline-none"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="focus:shadow-outline-blue rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgoraChannelForm;
