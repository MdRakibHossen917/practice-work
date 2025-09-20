import React from "react";

const Code = () => {
  return (
    <div
      className="border-base-800 border pb-20 md:pb-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 16px, var(--color-base-800) 16px, var(--color-base-800) 17px), repeating-linear-gradient(to right, var(--color-base-bg-main), var(--color-base-bg-main) 16px, var(--color-base-800) 16px, var(--color-base-800) 17px)"
      }}
    >
      <div className="container px-2">
        <div className="bg-base-bg-main border-base-800 flex justify-between border-x">
          <div className="flex">
            <svg
              className="shrink-0 -rotate-45"
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19.5" stroke="#27272A"></circle>
              <rect height="2" stroke="#3F3F46" width="21" x="9.5" y="19.5"></rect>
            </svg>
            <svg
              className="shrink-0"
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19.5" stroke="#27272A"></circle>
              <rect height="2" stroke="#3F3F46" width="21" x="9.5" y="19.5"></rect>
            </svg>
          </div>
          <div className="border-base-800 w-[10%] border-r md:w-[30%]"></div>
          <div className="flex flex-1">
            {/* এখানে বাকি nested flex divs, buttons, code section ইত্যাদি JSX এ রূপান্তর করতে হবে */}
          </div>
        </div>
        <div className="border-base-800 bg-base-bg-main border p-2">
          {/* Buttons এবং code display section */}
        </div>
      </div>
    </div>
  );
};

export default Code;
