"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "../common";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { checkUrl } from "@/utils/check-url";

const JoinSchema = z.object({
  cname: z.string().min(5, "Required").max(500, "Too long"),
});

type JoinSchemaType = z.infer<typeof JoinSchema>;

interface JoinFormProps {
  onCancel: () => void;
}

export const JoinForm: FC<JoinFormProps> = ({ onCancel }) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<JoinSchemaType>({ resolver: zodResolver(JoinSchema) });

  const checkChannelMutation = api.agora.checkChannelName.useMutation();

  const onSubmit: SubmitHandler<JoinSchemaType> = async (data) => {
    let cname = data.cname;

    const mbUrl = checkUrl(cname);
    if (mbUrl) {
      const params = mbUrl.searchParams;
      const mbCname = params.get("id");

      if (!mbCname) {
        return setError("cname", { message: "Invalid link" });
      }

      cname = mbCname;
    }

    const res = await checkChannelMutation.mutateAsync({ cname });
    console.log(res);

    if (!res) {
      return setError("cname", { message: "Channel not found" });
    }

    router.push(`/meet/room?id=${cname}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-[10px] border-green-500 bg-sky-200 bg-opacity-60 p-5 dark:border-blue-800 dark:bg-sky-500 dark:bg-opacity-40"
    >
      <div className="mx-1 my-4">
        <label className="text-3xl" htmlFor="cname">
          Channel name:
        </label>
        <input
          type="text"
          id="cname"
          autoFocus={true}
          className={`w-full border-b-[4px] bg-inherit p-2 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-50  ${errors.cname ? "border-red-600" : "border-green-800  dark:border-blue-900"}`}
          placeholder="Channel name or link"
          {...register("cname")}
        />
        {errors.cname && (
          <p className="text-2xl text-red-500">{errors.cname.message}</p>
        )}
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-1 gap-5">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={checkChannelMutation.isLoading}>
          {checkChannelMutation.isLoading ? "Loading.." : "Join"}
        </Button>
      </div>
    </form>
  );
};
