/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    formData: {
      id?: string;
      ps_surname: string | null;
      ps_givnam: string | null;
      ps_sex: string | null;
      ps_email: string | null;
      ps_dbirth: string | null;
    } | null;
  }
}