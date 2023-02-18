import React from "react";
import { z } from "zod";
import { motion } from "framer-motion";

const buttonSchema = z.object({
  isDisabled: z.boolean().optional(),
  type: z.enum(["button", "submit"]).optional(),
  text: z.string(),
  delegated: z.object({}).optional(),
});
type ButtonProps = z.infer<typeof buttonSchema>;
const Button = (
  { isDisabled = false, type = "button", text, ...delegated }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <motion.button
      {...delegated}
      disabled={isDisabled}
      ref={ref}
      type={type}
      className="hover:text flex w-full justify-center rounded-md border border-transparent bg-primary-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
};
export default React.forwardRef(Button);
