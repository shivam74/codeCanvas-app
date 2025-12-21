import IKImage from "./IKImage";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <IKImage
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ea 
          odio, eaque ipsa dolor repudiandae eum. Asperiores, soluta! 
          Praesentium nisi aliquam dignissimos itaque eaque cum maxime optio 
          repellat suscipit eveniet?
        </p>
      </div>
    </div>
  );
};

export default Comment;