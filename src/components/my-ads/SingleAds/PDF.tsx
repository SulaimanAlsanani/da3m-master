import { useTranslations } from 'next-intl'
import React from 'react'

const PDF = ({pdf}:{pdf:string}) => {
  const t = useTranslations('myAds')
  return (
    <a href={pdf} target='_blank' className="flex items-center px-[23px] py-[15px] bg-[#2EA044]/[0.05] rounded-[14px]">
    <svg
      id="vuesax_linear_document-text"
      data-name="vuesax/linear/document-text"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g id="document-text">
        <path
          id="Vector"
          d="M20,8v5c0,5-2,7-7,7H7c-5,0-7-2-7-7V7C0,2,2,0,7,0h5"
          transform="translate(2 2)"
          fill="none"
          stroke="#2ea044"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M8,8H4C1,8,0,7,0,4V0Z"
          transform="translate(14 2)"
          fill="none"
          stroke="#2ea044"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(7 13)"
          fill="none"
          stroke="#2ea044"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H4"
          transform="translate(7 17)"
          fill="none"
          stroke="#2ea044"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
    <p className="ms-1 me-[35px] text-[#333C52] text-[13px] font-bold">
      {t("pdf")}    </p>
    <svg
      id="import_bulk"
      data-name="import/bulk"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g id="vuesax_bulk_import" data-name="vuesax/bulk/import">
        <g id="import">
          <path
            id="Vector"
            d="M20,.86A.86.86,0,0,0,19.14,0H.86A.854.854,0,0,0,0,.86a9.565,9.565,0,0,0,10,10A9.571,9.571,0,0,0,20,.86Z"
            transform="translate(2 9.9)"
            fill="#2ea044"
            opacity="0.4"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M4.12,12.66,6.97,9.82A.75.75,0,0,0,5.91,8.76L4.35,10.32V.75a.75.75,0,0,0-1.5,0v9.57L1.28,8.76a.754.754,0,0,0-1.06,0,.748.748,0,0,0,0,1.06l2.85,2.84A.725.725,0,0,0,4.12,12.66Z"
            transform="translate(8.34 3.24)"
            fill="#2ea044"
          />
          <path
            id="Vector-3"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  </a>
  )
}

export default PDF