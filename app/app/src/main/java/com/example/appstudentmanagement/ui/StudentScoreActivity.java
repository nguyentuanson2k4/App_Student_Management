package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.appstudentmanagement.R;
import com.example.appstudentmanagement.adapter.ScoreAdapter;
import com.example.appstudentmanagement.api.ApiClient;
import com.example.appstudentmanagement.api.ApiService;
import com.example.appstudentmanagement.model.Score;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class StudentScoreActivity extends AppCompatActivity {

    private RecyclerView recyclerScores;
    private LinearLayout layoutEmpty;
    private TextView txtSummary;

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
        txtSummary = findViewById(R.id.txtSummary);

        layoutEmpty = findViewById(R.id.layoutEmpty);

        String code = getIntent().getStringExtra("student_code");
        String name = getIntent().getStringExtra("student_name");

        txtName.setText(name);
        txtCode.setText("Mã SV: " + code);

        // ===== RECYCLER =====
        recyclerScores = findViewById(R.id.recyclerScores);
        recyclerScores.setLayoutManager(new LinearLayoutManager(this));

        loadScores(code);
    }

    private void loadScores(String code) {
        // Hiện loading giả (coi như empty)
        layoutEmpty.setVisibility(View.VISIBLE);

        ApiClient.getClient()
                .create(ApiService.class)
                .getScoresByStudentCode(code)
                .enqueue(new Callback<List<Score>>() {

                    @Override
                    public void onResponse(Call<List<Score>> call,
                                           Response<List<Score>> response) {

                        if (response.isSuccessful()
                                && response.body() != null
                                && !response.body().isEmpty()) {

                            List<Score> scores = response.body();
                            recyclerScores.setAdapter(new ScoreAdapter(scores));

                            updateSummary(scores);

                            layoutEmpty.setVisibility(View.GONE);

                        } else {
                            showEmptyState();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Score>> call, Throwable t) {
                        showEmptyState();
                    }
                });
    }

    private void updateSummary(List<Score> scores) {
        int totalSubjects = scores.size();
        double totalScore = 0;

        for (Score s : scores) {
            try {
                totalScore += Double.parseDouble(s.total);
            } catch (Exception ignored) {}
        }

        double avgScore = totalSubjects > 0
                ? totalScore / totalSubjects
                : 0;

        avgScore = Math.round(avgScore * 100.0) / 100.0;

        txtSummary.setText(
                "Tổng số môn: " + totalSubjects + " | Điểm TB: " + avgScore
        );
    }

    private void showEmptyState() {
        layoutEmpty.setVisibility(View.VISIBLE);
        recyclerScores.setAdapter(null);
        txtSummary.setText("Tổng số môn: 0 | Điểm TB: 0.0");
    }
}
