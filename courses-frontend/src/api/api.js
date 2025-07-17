const BASE_URL = "http://localhost:8080/api";

// === COURSES ===

export const fetchCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

export const getCourseById = async (courseId) => {
  const res = await fetch(`${BASE_URL}/courses/${courseId}`);
  if (!res.ok) throw new Error("Course not found");
  return res.json();
};

export const createCourse = async (course) => {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteCourse = async (courseId) => {
  const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
  return res;
};

// === INSTANCES ===

export const createInstance = async (instance) => {
  const res = await fetch(`${BASE_URL}/instances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instance),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteInstance = async (year, semester, courseId) => {
  const res = await fetch(`${BASE_URL}/instances/${year}/${semester}/${courseId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
  return res;
};

export const getInstancesByYearSemester = async (year, semester) => {
  const res = await fetch(`${BASE_URL}/instances/${year}/${semester}`);
  if (!res.ok) throw new Error("Failed to fetch instances");
  return res.json();
};

export const getInstanceDetail = async (year, semester, courseId) => {
  const res = await fetch(`${BASE_URL}/instances/${year}/${semester}/${courseId}`);
  if (!res.ok) throw new Error("Instance not found");
  return res.json();
};
