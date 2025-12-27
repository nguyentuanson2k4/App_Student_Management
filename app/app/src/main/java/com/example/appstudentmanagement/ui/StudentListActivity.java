package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

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

public class StudentListActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private StudentAdapter adapter;

    private List<Student> studentList = new ArrayList<>();
    private List<Student> originalList = new ArrayList<>();

    private LinearLayout layoutEmpty;
    private TextView txtStudentCount, txtEmptyTitle, txtEmptyMessage;
    private ImageView imgEmpty;
    private Button btnRetry;
    private EditText edtSearch;
    private ImageView btnClearSearch;
    private MaterialToolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_list);

        initViews();
        setupRecyclerView();
        setupSearch();
        loadStudents();
    }

    private void initViews() {
        toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Danh sách sinh viên");
        toolbar.setNavigationOnClickListener(v -> finish());

        recyclerView = findViewById(R.id.recyclerStudents);
        layoutEmpty = findViewById(R.id.layoutEmpty);

        txtStudentCount = findViewById(R.id.txtStudentCount);
        txtEmptyTitle = findViewById(R.id.txtEmptyTitle);
        txtEmptyMessage = findViewById(R.id.txtEmptyMessage);
        imgEmpty = findViewById(R.id.imgEmpty);
        btnRetry = findViewById(R.id.btnRetry);

        edtSearch = findViewById(R.id.edtSearch);
        btnClearSearch = findViewById(R.id.btnClearSearch);
    }

    private void setupRecyclerView() {
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new StudentAdapter(this, studentList, StudentDetailActivity.class);
        recyclerView.setAdapter(adapter);
    }

    private void setupSearch() {
        edtSearch.addTextChangedListener(new TextWatcher() {
            @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override public void afterTextChanged(Editable s) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                btnClearSearch.setVisibility(s.length() > 0 ? View.VISIBLE : View.GONE);
                filterStudents(s.toString());
            }
        });

        btnClearSearch.setOnClickListener(v -> {
            edtSearch.setText("");
            btnClearSearch.setVisibility(View.GONE);
        });
    }

    private void filterStudents(String keyword) {
        studentList.clear();

        if (keyword.isEmpty()) {
            studentList.addAll(originalList);
        } else {
            for (Student s : originalList) {
                if (s.getName().toLowerCase().contains(keyword.toLowerCase()) ||
                        s.getStudentCode().toLowerCase().contains(keyword.toLowerCase())) {
                    studentList.add(s);
                }
            }
        }

        adapter.notifyDataSetChanged();
        updateUI();
    }

    private void loadStudents() {
        showLoadingState();

        ApiClient.getClient().create(ApiService.class)
                .getAllStudents()
                .enqueue(new Callback<List<Student>>() {

                    @Override
                    public void onResponse(Call<List<Student>> call, Response<List<Student>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            originalList.clear();
                            originalList.addAll(response.body());

                            studentList.clear();
                            studentList.addAll(originalList);

                            adapter.notifyDataSetChanged();
                            updateUI();
                        } else {
                            showErrorState("Lỗi tải dữ liệu", "Không thể tải danh sách sinh viên");
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Student>> call, Throwable t) {
                        showErrorState("Lỗi kết nối", "Không thể kết nối server");
                    }
                });
    }

    private void updateUI() {
        int count = studentList.size();
        txtStudentCount.setText(count + " sinh viên");
        toolbar.setSubtitle(count > 0 ? count + " sinh viên" : null);

        if (count == 0) {
            showEmptyState(
                    edtSearch.getText().toString().isEmpty()
                            ? "Danh sách trống"
                            : "Không tìm thấy",
                    edtSearch.getText().toString().isEmpty()
                            ? "Chưa có sinh viên nào"
                            : "Không có sinh viên phù hợp"
            );
        } else {
            layoutEmpty.setVisibility(View.GONE);
        }
    }

    private void showLoadingState() {
        layoutEmpty.setVisibility(View.VISIBLE);
        imgEmpty.setVisibility(View.GONE);
        btnRetry.setVisibility(View.GONE);
        txtEmptyTitle.setText("Đang tải dữ liệu...");
        txtEmptyMessage.setText("Vui lòng chờ");
    }

    private void showEmptyState(String title, String message) {
        layoutEmpty.setVisibility(View.VISIBLE);
        imgEmpty.setVisibility(View.VISIBLE);
        imgEmpty.setImageResource(R.drawable.ic_empty_student);
        btnRetry.setVisibility(View.GONE);
        txtEmptyTitle.setText(title);
        txtEmptyMessage.setText(message);
    }

    private void showErrorState(String title, String message) {
        layoutEmpty.setVisibility(View.VISIBLE);
        imgEmpty.setVisibility(View.VISIBLE);
        imgEmpty.setImageResource(R.drawable.ic_error);
        txtEmptyTitle.setText(title);
        txtEmptyMessage.setText(message);

        btnRetry.setVisibility(View.VISIBLE);
        btnRetry.setOnClickListener(v -> loadStudents());
    }
}
