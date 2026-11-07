import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import FormField from "../../../common/molecules/FormField";
import Input from "../../../common/atoms/Input";
import Select from "../../../common/atoms/Select";
import Button from "../../../common/atoms/Button";
import ImageUploader from "../../../common/molecules/ImageUploader";

export default function AddMenuItemForm({
  register,
  control,
  errors,
  isSubmitting,
  isPending,
  onSubmit,
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-white mb-6">Add New Dish</h2>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name */}
        <FormField
          label="Dish Name"
          htmlFor="name"
          required
          error={errors.name?.message}
          theme="admin"
        >
          <Input
            id="name"
            type="text"
            theme="admin"
            hasError={!!errors.name}
            {...register("name")}
            placeholder="e.g. Grilled Seabass"
          />
        </FormField>

        {/* Category + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Category"
            htmlFor="category"
            required
            error={errors.category?.message}
            theme="admin"
          >
            <Select
              id="category"
              theme="admin"
              hasError={!!errors.category}
              {...register("category")}
            >
              <option value="Main Course">Main Course</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </Select>
          </FormField>

          <FormField
            label="Price (EGP)"
            htmlFor="price"
            required
            error={errors.price?.message}
            theme="admin"
          >
            <Input
              id="price"
              type="number"
              step="any"
              theme="admin"
              hasError={!!errors.price}
              {...register("price")}
              placeholder="260"
            />
          </FormField>
        </div>

        {/* Description */}
        <FormField
          label="Description"
          htmlFor="description"
          error={errors.description?.message}
          theme="admin"
        >
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            placeholder="Describe the dish, ingredients, preparation, etc."
            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
          />
        </FormField>

        {/* Image */}
        <FormField
          label="Dish Image"
          htmlFor="image-uploader"
          error={errors.image?.message}
          theme="admin"
        >
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                error={errors.image?.message}
                disabled={isSubmitting || isPending}
              />
            )}
          />
        </FormField>

        {/* Video URL */}
        <FormField
          label="Video URL"
          htmlFor="videoUrl"
          error={errors.videoUrl?.message}
          theme="admin"
        >
          <Input
            id="videoUrl"
            type="url"
            theme="admin"
            hasError={!!errors.videoUrl}
            {...register("videoUrl")}
            placeholder="https://youtube.com/watch?v=... or any video link"
          />

          <p className="text-xs text-gray-500 mt-1.5">
            Optional — YouTube, Vimeo, direct URL, etc.
          </p>
        </FormField>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/50">
          <Link
            to="/admin/menu"
            className="px-5 py-2.5 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Cancel
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="md"
            rounded={false}
            loading={isSubmitting || isPending}
          >
            Add Dish
          </Button>
        </div>
      </form>
    </div>
  );
}
