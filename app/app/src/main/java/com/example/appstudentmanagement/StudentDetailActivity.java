package com.example.appstudentmanagement;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class StudentDetailActivity extends AppCompatActivity {

    private TextView txtStudentCode, txtStudentName;
    private RecyclerView recyclerScores;

    private ApiService api;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_detail);

        // 🔥 ÁNH XẠ VIEW
        txtStudentCode = findViewById(R.id.txtStudentCode);
        txtStudentName = findViewById(R.id.txtStudentName);
        recyclerScores = findViewById(R.id.recyclerScores);

        recyclerScores.setLayoutManager(new LinearLayoutManager(this));

        api = ApiClient.getClient().create(ApiService.class);

        // 🔥 NHẬN student_code TỪ INTENT
        String studentCode = getIntent().getStringExtra("student_code");

        if (studentCode != null && !studentCode.isEmpty()) {
            loadStudentInfo(studentCode);
            loadScores(studentCode);
        } else {
            Toast.makeText(this,
                    "Không nhận được mã sinh viên",
                    Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    // ================= LOAD THÔNG TIN SINH VIÊN =================
    private void loadStudentInfo(String code) {
        api.getStudentByCode(code).enqueue(new Callback<Student>() {
            @Override
            public void onResponse(Call<Student> call,
                                   Response<Student> response) {

                if (response.isSuccessful() && response.body() != null) {
                    Student st = response.body();
                    txtStudentCode.setText("Mã SV: " + st.getStudentCode());
                    txtStudentName.setText("Tên: " + st.getName());
                } else {
                    Toast.makeText(StudentDetailActivity.this,
                            "Không tìm thấy sinh viên",
                            Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Student> call, Throwable t) {
                Toast.makeText(StudentDetailActivity.this,
                        "Không tải được thông tin sinh viên",
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

    // ================= LOAD ĐIỂM =================
    private void loadScores(String code) {
        api.getScoresByStudentCode(code).enqueue(new Callback<List<Score>>() {
            @Override
            public void onResponse(Call<List<Score>> call,
                                   Response<List<Score>> response) {

                if (response.isSuccessful() && response.body() != null) {
                    ScoreAdapter adapter =
                            new ScoreAdapter(response.body());
                    recyclerScores.setAdapter(adapter);
                } else {
                    Toast.makeText(StudentDetailActivity.this,
                            "Không có dữ liệu điểm",
                            Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Score>> call, Throwable t) {
                Toast.makeText(StudentDetailActivity.this,
                        "Không tải được điểm",
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}
