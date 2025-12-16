package com.example.appstudentmanagement;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiService {

    // 🔥 LẤY TẤT CẢ SINH VIÊN
    @GET("api/v1/students")
    Call<List<Student>> getAllStudents();

    // 🔥 LẤY SINH VIÊN THEO MÃ
    @GET("api/v1/students/{code}")
    Call<Student> getStudentByCode(@Path("code") String code);

    // 🔥 LẤY ĐIỂM THEO MÃ SINH VIÊN
    @GET("api/v1/scores/student/{code}")
    Call<List<Score>> getScoresByStudentCode(@Path("code") String code);
}
