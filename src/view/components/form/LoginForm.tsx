import React from 'react'
import { TypographyVariant } from '../types'
import Typography from '../Typography/Typography'

const LoginForm = () => {
  return (
<div className="form-container bg-white shadow-md rounded-lg py-6 px-10 md:py-16 md:px-24">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#98A2B3] pb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]"
                //   placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#98A2B3] pb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full mt-1 py-5 px-2 border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D0D5DD] text-[#98A2B3]"
                //   placeholder="Enter your password"
                  required
                />
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-[#FD671E]"
                >
                  I forgot my password
                </Typography>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FD671E] text-white py-4 px-2 rounded-lg hover:bg-[#FD671E] focus:outline-none focus:ring-2 focus:[#FD671E]"
              >
                Login
              </button>
            </form>
          </div>  )
}

export default LoginForm;