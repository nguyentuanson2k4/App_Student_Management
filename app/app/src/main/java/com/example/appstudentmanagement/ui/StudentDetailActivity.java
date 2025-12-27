package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.example.appstudentmanagement.R;
import com.example.appstudentmanagement.api.ApiClient;
import com.example.appstudentmanagement.api.ApiService;
import com.example.appstudentmanagement.model.Student;
import com.google.android.material.appbar.MaterialToolbar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class StudentDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_detail);

        // TOOLBAR
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Thông Tin Sinh Viên");
        toolbar.setNavigationOnClickListener(v -> finish());

        String code = getIntent().getStringExtra("student_code");
        if (code == null || code.isEmpty()) {
            finish();
            return;
        }

        ImageView imgAvatar = findViewById(R.id.imgAvatar);
        TextView txtCode = findViewById(R.id.txtStudentCode);
        TextView txtName = findViewById(R.id.txtStudentName);
        TextView txtGender = findViewById(R.id.txtGender);
        TextView txtDob = findViewById(R.id.txtDob);
        TextView txtEmail = findViewById(R.id.txtEmail);
        TextView txtPhone = findViewById(R.id.txtPhone);

        ApiClient.getClient()
                .create(ApiService.class)
                .getStudentByCode(code)
                .enqueue(new Callback<List<Student>>() {

                    @Override
                    public void onResponse(Call<List<Student>> call,
                                           Response<List<Student>> response) {

                        if (!response.isSuccessful()
                                || response.body() == null
                                || response.body().isEmpty()) {

                            Toast.makeText(
                                    StudentDetailActivity.this,
                                    "Không tìm thấy sinh viên",
                                    Toast.LENGTH_SHORT
                            ).show();
                            return;
                        }

                        // LẤY SINH VIÊN ĐẦU TIÊN
                        Student s = response.body().get(0);

                        txtCode.setText(safe(s.getStudentCode()));
                        txtName.setText(safe(s.getName()));
                        txtGender.setText(mapGender(s.getGender()));
                        txtDob.setText(formatDate(s.getDob()));
                        txtEmail.setText(safe(s.getEmail()));
                        txtPhone.setText(safe(s.getPhone()));

                        // LOAD AVATAR (AN TOÀN)
                        if (imgAvatar != null) {
                            Glide.with(StudentDetailActivity.this)
                                    .load(s.getAvatarUrl())
                                    .placeholder(R.drawable.avatar_default)
                                    .error(R.drawable.avatar_default)
                                    .into(imgAvatar);
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Student>> call, Throwable t) {
                        Log.e("API_ERROR", t.getMessage(), t);
                        Toast.makeText(
                                StudentDetailActivity.this,
                                "Lỗi tải dữ liệu: " + t.getMessage(),
                                Toast.LENGTH_LONG
                        ).show();
                    }
                });

    }

    // MAP GIỚI TÍNH
    private String mapGender(String g) {
        if (g == null) return "Không rõ";
        switch (g) {
            case "M": return "Nam";
            case "F": return "Nữ";
            case "O": return "Khác";
            default: return g;
        }
    }

    // FORMAT NGÀY SINH
    private String formatDate(String isoDate) {
        if (isoDate == null || isoDate.isEmpty()) return "Không có";
        try {
            SimpleDateFormat input =
                    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat output =
                    new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
            Date date = input.parse(isoDate);
            return output.format(date);
        } catch (Exception e) {
            // fallback: chỉ lấy yyyy-MM-dd
            return isoDate.length() >= 10 ? isoDate.substring(0, 10) : isoDate;
        }
    }

    // ===== NULL SAFE =====
    private String safe(String s) {
        return s == null ? "" : s;
    }
}
