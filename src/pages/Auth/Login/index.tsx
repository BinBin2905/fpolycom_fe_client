import { useState } from "react";

import Thumbnail from "./Thumbnail";
import InputCom from "../../../components/Helpers/InputCom";
import Layout from "../../../components/Partials/Headers/Layout";

export default function Login() {
  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Log In
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="example@quomodosoft.com"
                      label="Email Address*"
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="● ● ● ● ● ●"
                      label="Password*"
                      name="password"
                      type="password"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="forgot-password-area flex justify-between items-center mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={rememberMe}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={rememberMe}
                        className="text-base text-black"
                      >
                        Remember Me
                      </span>
                    </div>
                    <a
                      href="/forgot-password"
                      className="text-base text-qyellow"
                    >
                      Forgot Password
                    </a>
                  </div>
                  <div className="signin-area mb-3.5">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>Log In</span>
                      </button>
                    </div>
                    <a
                      href="#"
                      className="w-full border border-qgray-border h-[50px] flex space-x-3  justify-center bg-[#FAFAFA] items-center"
                    >
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.996094 5.84908C1.16824 5.4342 1.39908 5.05557 1.64948 4.69305C3.11666 2.56225 5.08464 1.20482 7.58081 0.757711C10.48 0.238101 13.0818 0.947026 15.308 2.97713C15.3901 3.05366 15.394 3.09394 15.3158 3.1745C14.5098 3.99621 13.7078 4.82195 12.9096 5.65171C12.8235 5.74033 12.7844 5.72422 12.7022 5.65171C11.6107 4.65277 10.3235 4.20164 8.87584 4.33456C6.50487 4.5561 4.93597 5.89339 4.05566 8.13698C4.04001 8.17323 4.02436 8.20545 4.01262 8.24171C3.77005 8.04433 3.52356 7.85099 3.27707 7.65765C2.79584 7.27499 2.31851 6.88428 1.83337 6.50565C1.55558 6.28411 1.29344 6.04243 0.996094 5.84908Z"
                          fill="#C34131"
                        />
                        <path
                          d="M15.3197 17.3207C14.8463 17.7799 14.3142 18.1626 13.743 18.4808C12.6631 19.085 11.505 19.4193 10.2804 19.5401C8.90324 19.6811 7.55343 19.5522 6.24275 19.0809C4.09479 18.3035 2.4359 16.9058 1.26998 14.8878C1.16434 14.7066 1.05479 14.5334 0.988281 14.332C1.02349 14.3078 1.06262 14.2917 1.09392 14.2635C1.62602 13.8405 2.15811 13.4136 2.69412 12.9906C3.13232 12.6402 3.57052 12.2938 4.00872 11.9434C4.20434 12.4791 4.43909 12.9947 4.77165 13.4619C5.71456 14.7911 6.96265 15.6169 8.55111 15.8263C9.88136 15.9995 11.1529 15.7619 12.3071 15.0167C12.3345 15.0006 12.3658 14.9845 12.3932 14.9684C12.5771 15.1094 12.7649 15.2463 12.9448 15.3913C13.5669 15.8868 14.189 16.3822 14.8072 16.8857C14.9872 17.0307 15.1789 17.1435 15.3197 17.3207Z"
                          fill="#61A053"
                        />
                        <path
                          d="M14.2618 12.0637C14.2618 12.0517 14.2579 12.0396 14.2579 12.0315C14.2149 11.959 14.1445 11.9792 14.0819 11.9792C12.5443 11.9792 11.0067 11.9792 9.46905 11.9792C9.28125 11.9792 9.28125 11.9792 9.28125 11.7898C9.28125 10.7184 9.28125 9.64695 9.28125 8.57148C9.28125 8.37411 9.28125 8.37008 9.47687 8.37008C12.2195 8.37008 14.9583 8.37008 17.7009 8.37008C17.7244 8.37008 17.7479 8.37008 17.7713 8.37008C17.8535 8.36202 17.8887 8.40633 17.9005 8.48286C17.9122 8.58759 17.9161 8.69232 17.9357 8.79302C18.01 9.16359 18.0257 9.54222 18.0374 9.91683C18.0491 10.3317 18.0648 10.7466 18.0139 11.1574C17.9748 11.4716 17.967 11.7898 17.9044 12.1C17.8535 12.3618 17.8105 12.6277 17.744 12.8895C17.6853 13.1231 17.6383 13.3567 17.5601 13.5863C17.4583 13.8844 17.3566 14.1825 17.2236 14.4684C17.1101 14.7142 17.0045 14.9599 16.8754 15.1975C16.8167 15.3063 16.7228 15.407 16.7345 15.5479C16.5702 15.6164 16.5389 15.7775 16.488 15.9226C16.3198 16.0313 16.2376 16.2085 16.1516 16.3817C16.1359 16.3898 16.1124 16.3898 16.1007 16.4019C15.9129 16.5993 15.7525 16.8208 15.5451 16.998C15.4982 17.0383 15.4278 17.0584 15.4043 17.1309C15.3808 17.2115 15.3339 17.2035 15.2791 17.1632C15.0952 17.0222 14.9035 16.8893 14.7274 16.7362C14.2501 16.3254 13.7454 15.9588 13.2642 15.56C13.0568 15.3868 12.8416 15.2297 12.6303 15.0646C12.556 15.0082 12.513 14.9599 12.6225 14.8753C12.9159 14.6497 13.1781 14.3919 13.405 14.0979C13.4637 14.0213 13.5459 13.9529 13.538 13.8401C13.5967 13.8361 13.628 13.7958 13.6515 13.7474C13.761 13.5299 13.9058 13.3406 13.9958 13.107C14.121 12.7848 14.2227 12.4585 14.301 12.1242C14.3088 12.0839 14.2931 12.0718 14.2618 12.0637Z"
                          fill="#557BE8"
                        />
                        <path
                          d="M4.01274 11.948C3.57454 12.2984 3.13634 12.6448 2.69814 12.9953C2.16604 13.4182 1.63395 13.8452 1.09794 14.2681C1.06664 14.2923 1.02751 14.3124 0.9923 14.3366C0.839713 14.111 0.753639 13.8532 0.655827 13.6035C0.299791 12.6972 0.0963414 11.7546 0.0259167 10.7799C-0.0718954 9.43854 0.108079 8.14153 0.550189 6.87675C0.663652 6.55451 0.792764 6.2363 0.941438 5.93017C0.957088 5.90197 0.964913 5.86572 0.996213 5.84961C1.29356 6.04295 1.5557 6.28463 1.83348 6.50214C2.31863 6.88077 2.79595 7.27149 3.27719 7.65415C3.51976 7.84749 3.76625 8.04083 4.01274 8.23418C3.88754 8.69739 3.77408 9.16464 3.74278 9.648C3.69191 10.365 3.76234 11.0658 3.96579 11.7506C3.98535 11.8191 3.99709 11.8835 4.01274 11.948Z"
                          fill="#DFB32B"
                        />
                        <path
                          d="M16.7307 15.5569C16.719 15.4159 16.8129 15.3152 16.8716 15.2065C17.0007 14.9688 17.1063 14.7191 17.2198 14.4774C17.3528 14.1914 17.4584 13.8933 17.5562 13.5953C17.6306 13.3697 17.6775 13.132 17.7401 12.8984C17.8066 12.6366 17.8497 12.3708 17.9005 12.1089C17.9631 11.7988 17.971 11.4806 18.0101 11.1664C18.061 10.7555 18.0453 10.3407 18.0336 9.92577C18.0218 9.55117 18.0062 9.17254 17.9318 8.80196C17.9123 8.70126 17.9084 8.59653 17.8966 8.49181C17.8888 8.41125 17.8497 8.37097 17.7675 8.37902C17.744 8.38305 17.7206 8.37902 17.6971 8.37902C14.9544 8.37902 12.2157 8.37902 9.47306 8.37902C9.27743 8.37902 9.27743 8.37902 9.27743 8.58042C9.27743 9.65187 9.27743 10.7233 9.27743 11.7988C9.27743 11.9881 9.27743 11.9881 9.46523 11.9881C11.0028 11.9881 12.5404 11.9881 14.078 11.9881C14.1406 11.9881 14.2111 11.9639 14.2541 12.0405C13.4481 12.0405 12.6422 12.0364 11.8362 12.0364C11.0107 12.0364 10.189 12.0324 9.36351 12.0405C9.25396 12.0405 9.22266 12.0123 9.22266 11.8955C9.22657 10.7475 9.22657 9.5995 9.22266 8.4475C9.22266 8.33874 9.25396 8.31055 9.35568 8.31055C12.157 8.31457 14.9584 8.31457 17.7597 8.31055C17.8614 8.31055 17.924 8.32263 17.9436 8.45555C18.1901 10.0627 18.1353 11.6578 17.7167 13.2287C17.5054 14.0263 17.1924 14.7835 16.7777 15.4965C16.7698 15.5166 16.7503 15.5327 16.7307 15.5569Z"
                          fill="#6282CA"
                        />
                        <path
                          d="M13.5409 13.8398C13.5487 13.9526 13.4665 14.0211 13.4079 14.0976C13.1809 14.3917 12.9188 14.6495 12.6254 14.875C12.5158 14.9596 12.5588 15.008 12.6332 15.0644C12.8445 15.2295 13.0636 15.3906 13.267 15.5598C13.7482 15.9626 14.2569 16.3291 14.7303 16.736C14.9063 16.889 15.0981 17.022 15.2819 17.1629C15.3367 17.2072 15.3837 17.2113 15.4071 17.1307C15.4306 17.0582 15.501 17.0381 15.548 16.9978C15.7553 16.8206 15.9158 16.599 16.1036 16.4016C16.1153 16.3896 16.1349 16.3896 16.1544 16.3815C16.1309 16.4862 16.0488 16.5467 15.9862 16.6192C15.7788 16.8649 15.5636 17.1025 15.3211 17.316C15.1802 17.1388 14.9846 17.022 14.8124 16.885C14.1943 16.3815 13.5722 15.8861 12.9501 15.3906C12.7701 15.2456 12.5823 15.1087 12.3984 14.9677C12.8366 14.6535 13.2161 14.2749 13.5409 13.8398Z"
                          fill="#6282CA"
                        />
                        <path
                          d="M14.2629 12.0645C14.2942 12.0685 14.3098 12.0846 14.302 12.1208C14.2237 12.4552 14.122 12.7855 13.9968 13.1037C13.9068 13.3333 13.7621 13.5266 13.6525 13.7441C13.629 13.7925 13.5977 13.8327 13.5391 13.8368C13.7621 13.4581 13.9851 13.0795 14.1064 12.6525C14.1611 12.4592 14.2081 12.2618 14.2629 12.0645Z"
                          fill="#6282CA"
                        />
                        <path
                          d="M16.1523 16.3908C16.2384 16.2176 16.3167 16.0404 16.4888 15.9316C16.4027 16.1048 16.2971 16.2619 16.1523 16.3908Z"
                          fill="#6282CA"
                        />
                        <path
                          d="M16.4844 15.9312C16.5352 15.7862 16.5665 15.6251 16.7309 15.5566C16.6643 15.6896 16.5939 15.8265 16.4844 15.9312Z"
                          fill="#6282CA"
                        />
                      </svg>

                      <span className="text-[18px] text-qgraytwo font-normal">
                        Sign In with Google
                      </span>
                    </a>
                  </div>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Dont’t have an aceount ?
                      <a href="/signup" className="ml-2 text-qblack">
                        Sign up free
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
