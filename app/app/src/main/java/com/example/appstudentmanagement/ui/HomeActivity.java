package com.example.appstudentmanagement.ui;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.example.appstudentmanagement.R;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_home);

        // Toolbar
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Trang chủ");

        // Student Management Card
        MaterialCardView cardStudent = findViewById(R.id.cardStudent);
        cardStudent.setOnClickListener(v ->
                startActivity(new Intent(this, StudentListActivity.class)));

        // Score Management Card
        MaterialCardView cardScore = findViewById(R.id.cardScore);
        cardScore.setOnClickListener(v ->
                startActivity(new Intent(this, ScoreStudentListActivity.class)));
    }
}
