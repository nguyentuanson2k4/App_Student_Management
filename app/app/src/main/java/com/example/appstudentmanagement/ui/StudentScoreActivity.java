package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.*;
import com.example.appstudentmanagement.*;
import com.example.appstudentmanagement.api.*;
import com.example.appstudentmanagement.adapter.*;
import com.example.appstudentmanagement.model.*;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.List;
import retrofit2.*;

public class StudentScoreActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_student_score);

        // ===== TOOLBAR =====
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Bảng Điểm Sinh Viên");
        toolbar.setNavigationOnClickListener(v -> finish());

        // ===== HEADER =====
        TextView txtName = findViewById(R.id.txtStudentName);
        TextView txtCode = findViewById(R.id.txtStudentCode);

        String code = getIntent().getStringExtra("student_code");
        String name = getIntent().getStringExtra("student_name");

        txtName.setText(name);
        txtCode.setText("Mã SV: " + code);

        // ===== RECYCLER =====
        RecyclerView rv = findViewById(R.id.recyclerScores);
        rv.setLayoutManager(new LinearLayoutManager(this));

        ApiClient.getClient().create(ApiService.class)
                .getScoresByStudentCode(code)
                .enqueue(new Callback<List<Score>>() {
                    @Override
                    public void onResponse(Call<List<Score>> c, Response<List<Score>> r) {
                        if (r.isSuccessful() && r.body() != null) {
                            rv.setAdapter(new ScoreAdapter(r.body()));
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Score>> c, Throwable t) {}
                });
    }
}

