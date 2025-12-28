import React, { useEffect, useState } from "react";

function Notification({ profileImg, data, onRemove }) {

    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onRemove, 300)
        }, 5000)

        return () => clearTimeout(timer)


    }, [onRemove])
  return (
    <>
      <div class="flex flex-col gap-3">
        <div
          class={`border border-gray-200 rounded-lg shadow-lg
        relative transform transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
        >
          <div class="flex items-center p-4 ">
            <img
              class="object-cover w-12 h-12 rounded-lg"
              src="https://randomuser.me/api/portraits/women/71.jpg"
              alt="img"
            />

            <div class="ml-3 overflow-hidden">
              {/* <p class="font-medium text-gray-900">{username}</p> */}
              <p class="max-w-xs text-sm text-gray-500 truncate">{data.message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
