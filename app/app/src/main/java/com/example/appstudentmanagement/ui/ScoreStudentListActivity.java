package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.appstudentmanagement.R;
import com.example.appstudentmanagement.adapter.StudentAdapter;
import com.example.appstudentmanagement.api.ApiClient;
import com.example.appstudentmanagement.api.ApiService;
import com.example.appstudentmanagement.model.Student;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ScoreStudentListActivity extends AppCompatActivity {

    private StudentAdapter adapter;
    private List<Student> studentList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_list);

        // ===== TOOLBAR =====
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Quản Lý Điểm");
        toolbar.setNavigationOnClickListener(v -> finish());

        // ===== RECYCLER VIEW =====
        RecyclerView rv = findViewById(R.id.recyclerStudents);
        rv.setLayoutManager(new LinearLayoutManager(this));

        // ===== ADAPTER (TẠO TRƯỚC) =====
        adapter = new StudentAdapter(
                this,
                studentList,
                StudentScoreActivity.class // 👉 bấm → xem điểm SV
        );
        rv.setAdapter(adapter);

        // ===== SEARCH =====
        EditText edtSearch = findViewById(R.id.edtSearch);
        edtSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                adapter.filter(s.toString());
            }
            public void beforeTextChanged(CharSequence s,int a,int b,int c){}
            public void afterTextChanged(Editable s){}
        });

        // ===== LOAD DATA =====
        loadStudents();
    }

    private void loadStudents() {
        ApiClient.getClient()
                .create(ApiService.class)
                .getAllStudents()
                .enqueue(new Callback<List<Student>>() {

                    @Override
                    public void onResponse(Call<List<Student>> call,
                                           Response<List<Student>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            adapter.setData(response.body()); // 🔥 QUAN TRỌNG
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Student>> call, Throwable t) {
                    }
                });
    }
}
