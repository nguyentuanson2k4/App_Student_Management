package com.example.appstudentmanagement;

import com.google.gson.annotations.SerializedName;

public class Student {

    private int id;

    @SerializedName("student_code")
    private String studentCode;

    private String name;
    private String gender;
    private String dob;
    private String email;
    private String phone;

    @SerializedName("avatar_url")
    private String avatarUrl;

    // ===== GETTER =====
    public int getId() {
        return id;
    }

    public String getStudentCode() {
        return studentCode;
    }

    public String getName() {
        return name;
    }

    public String getGender() {
        return gender;
    }

    public String getDob() {
        return dob;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }
}
