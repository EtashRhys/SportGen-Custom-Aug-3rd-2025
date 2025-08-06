const API_BASE = "http://localhost:5000/api"; // Backend base URL

// ✅ Define expected response shapes
export interface UploadResponse {
  message: string;
  file: {
    path: string;
  };
}

export interface AnalysisResponse {
  feedback: string;
  poseData: {
    keypoints: Array<{ x: number; y: number; confidence: number }>;
    message?: string;
  };
}

// ✅ Upload video function
export async function uploadVideo(file: File, accessToken: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/videos/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed: ${errorText}`);
  }
  return res.json();
}

// ✅ Analyze video function
export async function analyzeVideo(videoPath: string): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoPath }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Analysis failed: ${errorText}`);
  }
  return res.json();
}
