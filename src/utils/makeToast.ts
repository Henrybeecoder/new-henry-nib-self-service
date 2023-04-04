import toast from "react-hot-toast";

export const errorToast = (text: string) => {
  toast.error(text, {
    duration: 5000,
    style: {
      backgroundColor: "#FCF7F7",
      color: "#DB353A",
    },
  });
};

export const successToast = (text: string) => {
  toast.success(text, {
    duration: 5000,
    style: {
      backgroundColor: "#ecf1e8",
      color: "#65CC14",
    },
  });
};
