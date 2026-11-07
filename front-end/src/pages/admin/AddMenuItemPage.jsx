import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import AddMenuItemForm from "../../components/features/admin/MenuItem/AddMenuItemForm";
import { menuService } from "../../services/menuService";
import { syncNewItems } from "../../utils/menuStorage";

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

export default function AddMenuItemPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(menuItemSchema),

    defaultValues: {
      name: "",
      category: "Main Course",
      price: "",
      description: "",
      image: "",
      videoUrl: "",
      available: true,
    },
  });

  const createMenuMutation = useMutation({
    mutationFn: (payload) => menuService.createMenuItem(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["menu"],
      });

      try {
        const updatedMenu = await menuService.getMenu();

        syncNewItems(updatedMenu);
      } catch (err) {
        console.error(
          "Menu item was created, but local menu order could not be synced:",
          err,
        );
      }

      toast.success("Menu item added successfully!", {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });

      navigate("/admin/menu");
    },

    onError: (err) => {
      console.error("Failed to add menu item:", err);

      const message = err.response?.data?.message || "Failed to add menu item.";

      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,

      price: Number(data.price),

      image:
        data.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",

      videoUrl: data.videoUrl || "",
    };

    createMenuMutation.mutate(payload);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/admin/menu"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Menu Management
      </Link>

      <AddMenuItemForm
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        isPending={createMenuMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
