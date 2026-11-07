import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import EditMenuItemForm from "../../components/features/admin/MenuItem/EditMenuItemForm";

import { menuService } from "../../services/menuService";
import { setItemAvailability } from "../../utils/menuStorage";

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required and must be a non-empty string"),

  category: z.enum(["Main Course", "Appetizer", "Dessert", "Beverage"], {
    errorMap: () => ({
      message: "Please select a valid category",
    }),
  }),

  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        invalid_type_error: "Price is required and must be a number",
      })
      .positive("Price must be greater than 0"),
  ),

  description: z.string().optional().default(""),

  image: z.string().optional().default(""),

  videoUrl: z
    .string()
    .url("Must be a valid URL (YouTube, Vimeo, etc.)")
    .or(z.literal(""))
    .optional()
    .default(""),

  available: z.boolean().default(true),
});

export default function EditMenuItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuItemSchema),
  });

  // Get menu item
  const {
    data: item,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu", id],
    queryFn: () => menuService.getMenuItem(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  // Fill form
  useEffect(() => {
    if (!item) return;

    reset({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description || "",
      image: item.image || "",
      videoUrl: item.videoUrl || "",
      available: item.available !== false,
    });
  }, [item, reset]);

  // Update menu item
  const updateMutation = useMutation({
    mutationFn: (data) => {
      const payload = {
        ...data,

        price: Number(data.price),

        image:
          data.image ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
      };

      return menuService.updateMenuItem(id, payload);
    },

    onSuccess: (_, data) => {
      setItemAvailability(id, data.available);

      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });

      queryClient.invalidateQueries({
        queryKey: ["menu", id],
      });

      toast.success("Menu item updated successfully!", {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });

      navigate("/admin/menu");
    },

    onError: (err) => {
      const message =
        err.response?.data?.message || "Failed to update menu item.";

      toast.error(message);
    },
  });

  // Handle load error
  useEffect(() => {
    if (!isError) return;

    toast.error("Failed to load menu item details.");
    navigate("/admin/menu");
  }, [isError, navigate]);

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back */}
      <Link
        to="/admin/menu"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Menu Management
      </Link>

      {/* Form */}
      <EditMenuItemForm
        register={register}
        control={control}
        errors={errors}
        isPending={updateMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
