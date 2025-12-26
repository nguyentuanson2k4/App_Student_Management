package com.example.appstudentmanagement.ui;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.example.appstudentmanagement.R;
import com.google.android.material.appbar.MaterialToolbar;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_home);

        // NOTE: Toolbar
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Trang chủ");

        findViewById(R.id.btnStudent).setOnClickListener(v ->
                startActivity(new Intent(this, StudentListActivity.class)));

        findViewById(R.id.btnScore).setOnClickListener(v ->
                startActivity(new Intent(this, ScoreStudentListActivity.class)));
    }
}
