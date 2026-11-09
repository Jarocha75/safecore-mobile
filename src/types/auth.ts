export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

/** Typ kurzu – zhoduje sa s `CourseType` vo webovej databáze. */
export type CourseType = "S" | "P" | "Z";

/** Kurz, ku ktorému má používateľ platný prístup (odpoveď `GET /api/mobile/me`). */
export type AuthCourse = {
  id: string;
  title: string;
  type: CourseType;
  expiresAt: string | null;
};

export type LoginResponse = { token: string; user: AuthUser };
export type MeResponse = { user: AuthUser; courses: AuthCourse[] };

export type Session = {
  token: string;
  user: AuthUser;
  courses: AuthCourse[];
};
