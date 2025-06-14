import Image from 'next/image'
import React from 'react'

const UserData = ({user}:{user:Record<string, any>}) => {
  return (
     <div className="flex items-center ">
              <Image
                src={user?.image}
                width={49}
                height={49}
                alt="userImage"
                className="  rounded-full"
              />
              <div className="flex flex-col ms-[22px]">
                <div className="flex items-center">
                  <p className="text-[#333C52] text-[17px] font-bold me-[7px]">
                    {user?.name}
                  </p>
                  {user?.verified && (
                    <svg
                      id="vuesax_bold_verify"
                      data-name="vuesax/bold/verify"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22.518"
                      height="22.518"
                      viewBox="0 0 22.518 22.518"
                    >
                      <g id="verify">
                        <path
                          id="Vector"
                          d="M18.347,8.2,17.071,6.72a2.079,2.079,0,0,1-.441-1.182V3.943a1.818,1.818,0,0,0-1.811-1.811H13.224a2.1,2.1,0,0,1-1.182-.441L10.56.415A1.891,1.891,0,0,0,8.2.415L6.722,1.7a2.164,2.164,0,0,1-1.182.432H3.917A1.818,1.818,0,0,0,2.106,3.943v1.6A2.135,2.135,0,0,1,1.675,6.72L.408,8.212a1.889,1.889,0,0,0,0,2.346l1.267,1.492a2.135,2.135,0,0,1,.432,1.173v1.6a1.818,1.818,0,0,0,1.811,1.811H5.54a2.1,2.1,0,0,1,1.182.441L8.2,18.354a1.891,1.891,0,0,0,2.364,0l1.482-1.276a2.079,2.079,0,0,1,1.182-.441h1.595a1.818,1.818,0,0,0,1.811-1.811V13.231a2.1,2.1,0,0,1,.441-1.182l1.276-1.482A1.9,1.9,0,0,0,18.347,8.2Zm-5.066-.591L8.749,12.143a.7.7,0,0,1-.995,0L5.484,9.873a.7.7,0,1,1,.995-.995l1.773,1.773,4.034-4.034a.7.7,0,0,1,.995.995Z"
                          transform="translate(1.881 1.874)"
                          fill="#13bf34"
                        />
                        <path
                          id="Vector-2"
                          data-name="Vector"
                          d="M0,0H22.518V22.518H0Z"
                          transform="translate(22.518 22.518) rotate(180)"
                          fill="none"
                          opacity="0"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className="flex items-center  gap-[3px] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.04"
                    height="19.14"
                    viewBox="0 0 19.04 19.14"
                  >
                    <path
                      id="Vector"
                      d="M10.845,1.528,10.8,4.234a1.486,1.486,0,0,0,.528,1.085l1.771,1.342c1.135.857.95,1.906-.407,2.335l-2.306.721a1.488,1.488,0,0,0-.893.935l-.55,2.1c-.436,1.657-1.521,1.821-2.421.364L5.262,11.082a1.47,1.47,0,0,0-1.2-.628l-2.385.121c-1.707.086-2.192-.9-1.078-2.2L2.013,6.733A1.486,1.486,0,0,0,2.277,5.47L1.549,3.156C1.127,1.8,1.884,1.05,3.234,1.492l2.106.693A1.49,1.49,0,0,0,6.533,2L8.732.414C9.924-.436,10.874.064,10.845,1.528Z"
                      transform="translate(0 6.919) rotate(-30)"
                      fill="#f68223"
                    />
                  </svg>
                  <span className="text-[17px] text-[#F68223]">
                    {user?.avg_rate}
                  </span>
                </div>
              </div>
            </div>
  )
}

export default UserData