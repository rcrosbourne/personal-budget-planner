import React from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
// FieldErrors<FieldValues>
const TextInputSchema = z.object({
  label: z.string(),
  type: z.string().optional(),
  hasErrors: z.boolean().optional(),
  errorMessage: z.string().optional(),
  delegated: z.object({}).optional(),
});
type TextInputProps = z.infer<typeof TextInputSchema>;
const TextInput = (
  {
    label,
    type = "text",
    hasErrors,
    errorMessage,
    ...delegated
  }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const generatedId = React.useId();
  return (
    <div>
      <label
        htmlFor={generatedId}
        className="block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...delegated}
          id={generatedId}
          ref={ref}
          type={type}
          className={`block w-full appearance-none rounded-md border ${
            hasErrors ? "border-secondary-red-400" : "border-neutral-300"
          } px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
        />
      </div>
      <AnimatePresence>
        {hasErrors && errorMessage && (
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            key={errorMessage}
            className={`mt-1 text-sm text-secondary-red-600 ${
              !hasErrors ? "opacity-0" : "opacity-100"
            }`}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
      {/*<p*/}
      {/*  className={`mt-1 text-sm text-secondary-red-600 ${*/}
      {/*    !hasErrors ? "opacity-0" : "opacity-100"*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  {errorMessage || "Placeholder"}*/}
      {/*</p>*/}
    </div>
  );
};
export default React.forwardRef(TextInput);
// <AnimatePresence>
//   <motion.img
//     key={image.src}
//     src={image.src}
//     initial={{ opacity: 0, y: 200 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   />
// </AnimatePresence>;
