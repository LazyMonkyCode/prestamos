import React from "react";


export function Payment10(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 11.5v2m2.5-3v2m-5-2v2M2.75 4.75a.25.25 0 0 1 0-.5m0 .5a.25.25 0 0 0 0-.5m8.5.5a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5m-3.186-.861a.83.83 0 0 0-.786-.556h-.645a.744.744 0 0 0-.16 1.47l.983.216a.834.834 0 0 1-.178 1.648h-.556a.83.83 0 0 1-.786-.556M7 2.833V2m0 5v-.833"></path>
        <path d="M12.5.5h-11a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1"></path>
      </g>
    </svg>
  )
}


export function PersonMinus(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 16c2.69 0 5.77 1.28 6 2H4c.2-.71 3.3-2 6-2"
        opacity=".3"
      ></path>
      <circle cx="10" cy="8" r="2" fill="currentColor" opacity=".3"></circle>
      <path
        fill="currentColor"
        d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4s4-1.79 4-4m-2 0c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2M2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4m2 0c.2-.71 3.3-2 6-2c2.69 0 5.77 1.28 6 2zm13-8h6v2h-6z"
      ></path>
    </svg>
  )
}

export const DebtorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <circle cx="32" cy="32" r="28" stroke="black" strokeWidth="2" fill="none" />
    <circle cx="32" cy="24" r="8" stroke="black" strokeWidth="2" fill="none" />
    <line x1="32" y1="32" x2="32" y2="44" stroke="black" strokeWidth="2" />
    <line x1="28" y1="44" x2="36" y2="44" stroke="black" strokeWidth="2" />
    <line x1="28" y1="44" x2="28" y2="50" stroke="black" strokeWidth="2" />
    <line x1="36" y1="44" x2="36" y2="50" stroke="black" strokeWidth="2" />
    <path d="M 24 18 C 24 15 28 12 32 12 C 36 12 40 15 40 18" stroke="black" strokeWidth="2" fill="none" />
    <line x1="28" y1="20" x2="30" y2="22" stroke="black" strokeWidth="2" />
    <line x1="36" y1="20" x2="34" y2="22" stroke="black" strokeWidth="2" />
  </svg>
);



export function Eye(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
      ></path>
    </svg>
  )
}


export function NoteIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.9.9 0 0 0-.629.256a.87.87 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.9.9 0 0 0 4.89 16H9l3 4l3-4h4.111a.9.9 0 0 0 .629-.256a.87.87 0 0 0 .26-.619v-9.25a.87.87 0 0 0-.26-.619a.9.9 0 0 0-.63-.256Z"
      ></path>
    </svg>
  )
}


export function DeleteIcon() {
  
  return ( <svg
    className="fill-current"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
      fill=""
    />
    <path
      d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
      fill=""
    />
    <path
      d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
      fill=""
    />
    <path
      d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
      fill=""
    />
  </svg>)
}

export function DollarSign(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.31-8.86c-1.77-.45-2.34-.94-2.34-1.67c0-.84.79-1.43 2.1-1.43c1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81c0 1.79 1.49 2.69 3.66 3.21c1.95.46 2.34 1.15 2.34 1.87c0 .53-.39 1.39-2.1 1.39c-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77c-.01-2.2-1.9-2.96-3.66-3.42"
      ></path>
    </svg>
  )
}


export default function EditIcon() {
  return (
    <svg
    className="fill-current"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_62_9787)">
      <path
        d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
        fill=""
      />
    </g>
    <defs>
      <clipPath id="clip0_62_9787">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
  )
}


export function MoneyBillAlt(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 640"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M320 144c-53.02 0-96 50.14-96 112c0 61.85 42.98 112 96 112c53 0 96-50.13 96-112c0-61.86-42.98-112-96-112m40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.99 7.99 0 0 1-11.09-2.22l-8.88-13.31a7.99 7.99 0 0 1 2.22-11.09l15.33-10.22a24 24 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32m-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64z"
      ></path>
    </svg>
  )
}


export function MoneyBag(
  props,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10.02v1.01m0-6.02v.94m0 7.54c3.5 0 6-1.24 6-4c0-3-1.5-5-4.5-6.5l1.18-1.52a.66.66 0 0 0-.56-1H4.88a.66.66 0 0 0-.56 1L5.5 3C2.5 4.51 1 6.51 1 9.51c0 2.74 2.5 3.98 6 3.98Z"></path>
        <path d="M6 9.56A1.24 1.24 0 0 0 7 10a1.12 1.12 0 0 0 1.19-1A1.12 1.12 0 0 0 7 8a1.12 1.12 0 0 1-1.19-1A1.11 1.11 0 0 1 7 6a1.26 1.26 0 0 1 1 .4"></path>
      </g>
    </svg>
  )
}


export const DollarIcon = ({ className = '', width = '24', height = '24' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`w-${width} h-${height} ${className}`}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-6h2v4h-2z"
      />
    </svg>
  );



  export const WalletIcon = ({ width = 30, height = 30, color = "currentColor" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={color}
      >
        <path d="M21 7h-7V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-9-2v2H5V5h7zm9 14H5V9h16v10zm-5-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
      </svg>
    );
  };


  export const PaymentIcon2 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M22 6h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 14h-20v-10h20v10zm-2-12h-16v2h16v-2z"/>
    </svg>
  );
 export  const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 1c-1.1 0-2 .9-2 2v2h-2v4h2v7c0 1.1.9 2 2 2s2-.9 2-2v-7h2v-4h-2v-2c0-1.1-.9-2-2-2zm0 10h-2v7h2v-7z"/>
</svg>
);
  export const ClientIcon = ({ width = 30, height = 30, color = "currentColor" }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A3.375 3.375 0 008.25 15h7.5a3.375 3.375 0 013.129 2.804M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9z"
        />
      </svg>
    );
  };

  

  export const PaymentIcon = ({ width = 40, height = 40, color = "currentColor" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={color}
      >
        <path d="M3 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H3zm0 2h18v2H3V6zm0 6h18v6H3v-6zm2 2v2h4v-2H5z" />
      </svg>
    );
  };



  
  export const UserIcon = ({ className = 'h-6 w-6', fill = 'currentColor' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.86 0-7 3.14-7 7 0 .552.448 1 1 1h12c.552 0 1-.448 1-1 0-3.86-3.14-7-7-7z"
      />
    </svg>
  );
  
  
  export const StarIcon = ({ filled }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.26a1 1 0 00.95.69h6.592c.969 0 1.371 1.24.588 1.81l-5.347 3.887a1 1 0 00-.364 1.118l2.036 6.26c.3.921-.755 1.688-1.54 1.118L12 18.897l-5.345 3.888c-.784.57-1.84-.197-1.54-1.118l2.036-6.26a1 1 0 00-.364-1.118L2.44 11.687c-.783-.57-.381-1.81.588-1.81h6.592a1 1 0 00.95-.69l2.036-6.26z"
      />
    </svg>
  );
  