import Replicate from "replicate";

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// تعريف الموديلات المفضلة لتسهيل استدعائها
export const AI_MODELS = {
  STABLE_VIDEO: "5f67d540d58ef02e0f093bc6006e0026e64303372fbf967f67756f7e4dfb0790",
  LUMA_DREAM_MACHINE: "luma/dream-machine",
  REPLICATE_VEO: "google/veo-2", // مثال افتراضي
};