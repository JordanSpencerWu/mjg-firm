'use client'

import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import { CircleAlert } from 'lucide-react'

type IFormInput = {
  firstName: string
  lastName: string
  email: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    e?.preventDefault()
    console.log('Form submitted with data:', data)
    // Handle form submission here
  }

  const onError = (errors: FieldErrors<IFormInput>) => {
    console.log('Form validation errors:', errors)
  }

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const minHeight = 120
    e.target.style.height = 'auto'
    e.target.style.height = Math.max(e.target.scrollHeight, minHeight) + 'px'
  }

  const inputClassNames =
    'w-full border-b border-[var(--color-primary)] bg-transparent px-3 py-3 text-base text-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-secondary)] focus:border-[var(--color-primary)] focus:bg-[#f2ebe6] focus:ring-0 focus:outline-none'

  const errorClassNames =
    'mb-4 mt-2 text-base text-red-500 h-[24px] flex items-center'

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 text-[var(--color-primary)] md:grid-cols-[1fr_2fr]">
      <div className="md:mt-6">
        <h2 className="mb-2.5 text-xl font-normal">CONTACT US.</h2>
        <a className="text-base" href="mailto:kp@themjgprfirm.com">
          kp@themjgprfirm.com
        </a>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="my-6 text-[var(--color-primary)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="firstName" className="mb-2 block font-medium">
              First name*
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="off"
              {...register('firstName', { required: 'First name is required' })}
              className={inputClassNames}
            />
            <span className={errorClassNames}>
              {errors?.firstName?.message && (
                <>
                  <CircleAlert size={18} className="mr-1 inline" />
                  {errors.firstName.message}
                </>
              )}
            </span>
          </div>

          <div>
            <label htmlFor="lastName" className="mb-2 block font-medium">
              Last name*
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="off"
              {...register('lastName', { required: 'Last name is required' })}
              className={inputClassNames}
            />
            <span className={errorClassNames}>
              {errors?.lastName?.message && (
                <>
                  <CircleAlert size={18} className="mr-1 inline" />
                  {errors.lastName.message}
                </>
              )}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Email*
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={inputClassNames}
          />
          <span className={errorClassNames}>
            {errors?.email?.message && (
              <>
                <CircleAlert size={18} className="mr-1 inline" />
                {errors.email.message}
              </>
            )}
          </span>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-medium">
            Message*
          </label>
          <textarea
            id="message"
            rows={1}
            {...register('message', { required: 'Message is required' })}
            className={`${inputClassNames} min-h-[120px] resize-none`}
            onInput={autoResize}
          />
          <span className={errorClassNames}>
            {errors?.message?.message && (
              <>
                <CircleAlert size={18} className="mr-1 inline" />
                {errors.message.message}
              </>
            )}
          </span>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 cursor-pointer px-6 py-3 text-2xl font-light transition-colors duration-200 hover:rounded hover:bg-[#e9e1d8]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
