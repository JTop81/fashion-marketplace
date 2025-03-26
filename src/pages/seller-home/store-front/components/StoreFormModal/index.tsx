import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "api/services/store-front";
import { IStoreFrontInfoDetailItem } from "api/services/store-front/interfaces/storefront-details-response.interface";
import { IUser } from "api/services/users/interfaces/user.interface";
import clsx from "clsx";
import InputField from "common/components/InputField";
import TextArea from "common/components/TextArea";
import { useAuthStore } from "setup/store/auth/authStore";

import { Category, StoreFrontInfoForm } from "../../types";

import StoreFrontFormCategories from "./StoreFrontFormCategories";
import StoreFrontFormLinks from "./StoreFrontFormLinks";

type StoreFormModalProps = {
  editModalOpen: boolean;
  categories: Category[];
  storeFrontInfoData: IStoreFrontInfoDetailItem;
  setStoreFrontInfoData: (data: IStoreFrontInfoDetailItem) => void;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const inputClasses = {
  base: clsx(
    "w-full h-11",
    "text-sm text-gray-700 placeholder-gray-400",
    "border border-black/10 rounded-lg",
    "px-5",
    "focus:outline-none",
    "transition-colors duration-200",
  ),
  default: "hover:border-primary/20",
  error: "border-red-300 hover:border-red-400 focus:border-red-500",
};

export default function StoreFormModal(props: StoreFormModalProps) {
  const {
    storeFrontInfoData,
    setStoreFrontInfoData,
    editModalOpen,
    categories,
    setEditModalOpen,
  } = props;

  const { user } = useAuthStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formState, setFormState] = useState<StoreFrontInfoForm>({
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    selectedCategories: categories,
    storeWebsites: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const updateSelectedCategories = (categories: Category[]) => {
    setFormState((prev) => ({ ...prev, selectedCategories: categories }));
  };

  const { mutate: updateUserInfoRequest, status } = useMutation<
    IUser,
    Error,
    string
  >({
    mutationKey: ["updateUserInfo", user?.user_role?.id],
    mutationFn: (id: string) => updateUserInfo(id, formState),
    onSuccess: () => {
      setEditModalOpen(false);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }

    if (!formState.storeDescription.trim()) {
      newErrors.storeDescription = "Store description is required";
    }

    if (!formState.storeAddress.trim()) {
      newErrors.storeAddress = "Store address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userRoleId = user?.user_role?.id;
    if (!userRoleId) {
      return;
    }

    setStoreFrontInfoData({
      ...storeFrontInfoData,
      user: {
        ...storeFrontInfoData.user,
        username: formState.storeName,
      },
      details: {
        ...storeFrontInfoData.details,
        bio: formState.storeDescription,
        address1: formState.storeAddress,
        websites: formState.storeWebsites,
      },
    });

    updateUserInfoRequest(userRoleId);
  };

  useEffect(() => {
    if (storeFrontInfoData) {
      setFormState({
        storeName: storeFrontInfoData.user?.username || "",
        storeDescription: storeFrontInfoData?.details?.bio || "",
        storeAddress: storeFrontInfoData?.details?.address1
          ? `${storeFrontInfoData.details.address1}${storeFrontInfoData.details.address2 ? `, ${storeFrontInfoData.details.address2}` : ""}`
          : "",
        selectedCategories: categories || [],
        storeWebsites: storeFrontInfoData?.details?.websites || [],
      });
    }
  }, [storeFrontInfoData, categories]);

  useEffect(() => {
    // Initialize Google Places Autocomplete
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error(
        "Google Maps API key is not configured. Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file",
      );
      return;
    }

    // Check if the script is already loaded
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]',
    );
    if (existingScript) {
      if (window.google?.maps?.places) {
        initAutocomplete();
      } else {
        // If the script is loaded but Google Maps is not initialized, wait for it
        const checkGoogleMaps = setInterval(() => {
          if (window.google?.maps?.places) {
            clearInterval(checkGoogleMaps);
            initAutocomplete();
          }
        }, 100);

        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkGoogleMaps), 10000);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      console.error(
        "Failed to load Google Maps API. Please check your API key and internet connection",
      );
    };

    script.onload = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
      } else {
        console.error(
          "Google Maps API loaded but Places library is not available",
        );
      }
    };

    document.head.appendChild(script);

    return () => {
      const script = document.querySelector(
        'script[src*="maps.googleapis.com"]',
      );
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initAutocomplete = () => {
    try {
      const input = document.getElementById(
        "store-front-form-address",
      ) as HTMLInputElement;
      if (!input || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["address"],
        fields: ["formatted_address", "address_components"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setFormState((prev) => ({
            ...prev,
            storeAddress: place.formatted_address || "",
          }));

          // Clear any address-related errors
          if (errors.storeAddress) {
            setErrors((prev) => ({
              ...prev,
              storeAddress: "",
            }));
          }
        }
      });
    } catch (error) {
      console.error("Error initializing Google Places Autocomplete:", error);
    }
  };

  return (
    <form
      className="w-full max-h-[85vh] overflow-y-auto lg:w-[500px] px-6 py-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <InputField
          label="Store Name"
          id="store-front-form-name"
          name="storeName"
          value={formState.storeName}
          onChange={handleChange}
          placeholder="Enter your store name"
          error={errors.storeName}
        />

        <TextArea
          label="Description"
          id="store-front-form-description"
          name="storeDescription"
          value={formState.storeDescription}
          onChange={handleChange}
          placeholder="Describe your store"
          error={errors.storeDescription}
          rows={4}
        />

        <InputField
          label="Address"
          id="store-front-form-address"
          name="storeAddress"
          value={formState.storeAddress}
          onChange={handleChange}
          placeholder="Start typing your address..."
          error={errors.storeAddress}
        />

        <StoreFrontFormCategories
          editModalOpen={editModalOpen}
          selectedCategories={formState.selectedCategories}
          updateSelectedCategories={updateSelectedCategories}
        />

        <StoreFrontFormLinks
          setFormState={setFormState}
          storeWebsites={formState.storeWebsites}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setEditModalOpen(false)}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === "pending"}
            className={clsx(
              "px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg transition-all duration-200",
              status === "pending"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90 active:bg-primary/80",
            )}
          >
            {status === "pending" ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
