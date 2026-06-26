'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BUSINESS } from '@/lib/utils'

interface EmploymentForm {
  name: string
  phone: string
  email: string
  position: string
  message: string
}

export default function EmploymentPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmploymentForm>()

  const onSubmit = async (data: EmploymentForm) => {
    try {
      const res = await fetch('/api/employment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Application submitted! We will contact you soon.')
      reset()
    } catch {
      toast.error('Failed to submit. Please email us directly.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-dark mb-4 text-center">We&apos;re Hiring!</h1>
      <p className="text-body text-center mb-8">
        Friendly Party Rental is looking for delivery drivers and setup crew members.
        Contact us at{' '}
        <a href={`tel:${BUSINESS.phone}`} className="text-secondary">{BUSINESS.phone}</a>
        {' or '}
        <a href={`mailto:${BUSINESS.email}`} className="text-secondary">{BUSINESS.email}</a>
      </p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-dark mb-6">Application Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Name *</label>
            <input {...register('name', { required: true })} className="w-full border rounded px-3 py-2" />
            {errors.name && <span className="text-red-500 text-xs">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Phone</label>
            <input type="tel" {...register('phone')} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email *</label>
            <input type="email" {...register('email', { required: true })} className="w-full border rounded px-3 py-2" />
            {errors.email && <span className="text-red-500 text-xs">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Position</label>
            <select {...register('position')} className="w-full border rounded px-3 py-2">
              <option value="Delivery Driver">Delivery Driver</option>
              <option value="Setup Crew">Setup Crew</option>
              <option value="Either">Either</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Message</label>
            <textarea {...register('message')} rows={4} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="btn-primary w-full">Submit Application</button>
        </form>
      </div>
    </div>
  )
}
