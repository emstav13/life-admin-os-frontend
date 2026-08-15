"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { supabase } from "@/lib/supabase";
import { API_URL } from "@/lib/api";


export default function DangerZoneCard() {

  const { t } = useLanguage();

  const router = useRouter();

  const [deleting, setDeleting] =
    useState(false);


  // =========================================================
  // DELETE ACCOUNT
  // =========================================================

  async function handleDeleteAccount() {

    if (deleting) {
      return;
    }


    // =======================================================
    // FIRST CONFIRMATION
    // =======================================================

    const firstConfirmed =
      window.confirm(
        `${t.confirmDelete}\n\n${t.deleteAccountWarning}`
      );

    if (!firstConfirmed) {
      return;
    }


    // =======================================================
    // SECOND CONFIRMATION
    // =======================================================

    const secondConfirmed =
      window.confirm(
        `${t.deleteAccountWarning}\n\n` +
        "This action is permanent and cannot be undone.\n\n" +
        "Are you absolutely sure you want to delete your account?"
      );

    if (!secondConfirmed) {
      return;
    }


    try {

      setDeleting(true);


      // =====================================================
      // GET CURRENT SESSION
      // =====================================================

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();


      if (
        sessionError ||
        !session?.access_token
      ) {

        console.error(
          "Session error:",
          sessionError
        );

        window.alert(
          "Your session has expired. Please log in again."
        );

        return;
      }


      // =====================================================
      // DELETE ACCOUNT FROM BACKEND
      // =====================================================

      console.log(
        "Deleting account..."
      );


      const response = await fetch(
        `${API_URL}/account`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,

            Accept:
              "application/json",
          },
        }
      );


      const data =
        await response.json();


      console.log(
        "ACCOUNT DELETE RESPONSE:",
        response.status,
        data
      );


      // =====================================================
      // HANDLE BACKEND ERROR
      // =====================================================

      if (!response.ok) {

        throw new Error(
          data?.detail ||
          "Failed to delete account"
        );

      }


      // =====================================================
      // BACKEND SUCCESS
      // =====================================================

      console.log(
        "Account deleted successfully."
      );


      // =====================================================
      // CLEAR SUPABASE SESSION
      // =====================================================

      const {
        error: signOutError,
      } = await supabase.auth.signOut();


      if (signOutError) {

        console.error(
          "Sign out error:",
          signOutError
        );

      }


      // =====================================================
      // REDIRECT TO LOGIN
      // =====================================================

      router.replace(
        "/login"
      );

      router.refresh();


    } catch (error) {

      console.error(
        "Account deletion error:",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete account."
      );


    } finally {

      setDeleting(false);

    }
  }


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div
      className="
        rounded-2xl
        border
        border-red-200
        bg-white
        p-8
        shadow-lg
        dark:border-red-900/40
        dark:bg-[#2B2724]
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <h2
        className="
          mb-2
          text-2xl
          font-bold
          text-red-600
        "
      >
        🗑 {t.dangerZone}
      </h2>


      <p
        className="
          mb-8
          text-gray-500
          dark:text-gray-400
        "
      >
        {t.deleteAccountDescription}

        <br />

        {t.deleteAccountWarning}
      </p>


      {/* =====================================================
          DELETE ACCOUNT CARD
      ===================================================== */}

      <div
        className="
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-5
          dark:border-red-900/40
          dark:bg-red-950/20
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h3
              className="
                font-semibold
                text-red-700
                dark:text-red-400
              "
            >
              {t.deleteAccount}
            </h3>


            <p
              className="
                mt-1
                text-sm
                text-gray-600
                dark:text-gray-400
              "
            >
              {t.deleteAccountDescription}
            </p>

          </div>


          <button
            type="button"
            onClick={
              handleDeleteAccount
            }
            disabled={deleting}
            className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleting
              ? "Deleting..."
              : t.deleteAccount}
          </button>

        </div>

      </div>

    </div>
  );
}