'use client';

import React from 'react'
import { FormDataType } from '@repo/ui/types/index';
import { OneStepForm } from '@repo/ui/layouts/form/OneStepForm';
import { dataConfig } from '../data/dataConfig';

export default function MainForm() {
  const handleLogin = async (data: FormDataType) => {
    console.log('login data', data)
  }

  return (
    <OneStepForm
      config={dataConfig.mainForm}
      onSubmit={handleLogin}
    />
  )
}