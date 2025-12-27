package com.example.appstudentmanagement.ui;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

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
    private List<Student> originalList = new ArrayList<>(); // Danh sách gốc từ API
    private LinearLayout layoutEmpty;
    private TextView txtStudentCount;
    private EditText edtSearch;
    private ImageView btnClearSearch;
    private MaterialToolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_list);

        // ===== TOOLBAR =====
        toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Quản Lý Điểm");
        toolbar.setSubtitle("Chọn sinh viên để xem điểm");
        toolbar.setNavigationOnClickListener(v -> finish());

        // ===== INIT VIEWS =====
        layoutEmpty = findViewById(R.id.layoutEmpty);
        txtStudentCount = findViewById(R.id.txtStudentCount);
        edtSearch = findViewById(R.id.edtSearch);
        btnClearSearch = findViewById(R.id.btnClearSearch);

        // ===== RECYCLER VIEW =====
        RecyclerView rv = findViewById(R.id.recyclerStudents);
        rv.setLayoutManager(new LinearLayoutManager(this));

        // ===== ADAPTER =====
        adapter = new StudentAdapter(
                this,
                studentList,
                StudentScoreActivity.class
        );
        rv.setAdapter(adapter);

        // ===== SEARCH FUNCTIONALITY =====
        setupSearchFunctionality();

        // ===== LOAD DATA =====
        loadStudents();
    }

    private void setupSearchFunctionality() {
        // Search text change listener
        edtSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String query = s.toString().trim();
                filterStudents(query);

                // Show/hide clear button
                btnClearSearch.setVisibility(query.length() > 0 ? View.VISIBLE : View.GONE);
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        // Clear search button
        btnClearSearch.setOnClickListener(v -> {
            edtSearch.setText("");
            btnClearSearch.setVisibility(View.GONE);
            filterStudents("");
            edtSearch.clearFocus();
        });

        // Set search hint
        //edtSearch.setHint("Tìm theo tên, mã SV hoặc email...");

        // Clear focus when touching outside
        findViewById(R.id.recyclerStudents).setOnClickListener(v -> {
            edtSearch.clearFocus();
        });
    }

    private void filterStudents(String query) {
        studentList.clear();

        if (query.isEmpty()) {
            studentList.addAll(originalList);
        } else {
            String lowerCaseQuery = query.toLowerCase();
            for (Student student : originalList) {
                // Search in name, code, and email
                boolean matches = (student.getName() != null &&
                        student.getName().toLowerCase().contains(lowerCaseQuery)) ||
                        (student.getStudentCode() != null &&
                                student.getStudentCode().toLowerCase().contains(lowerCaseQuery)) ||
                        (student.getEmail() != null &&
                                student.getEmail().toLowerCase().contains(lowerCaseQuery));

                if (matches) {
                    studentList.add(student);
                }
            }
        }

        adapter.notifyDataSetChanged();
        updateUI();
    }

    private void updateUI() {
        // Update student count
        int count = studentList.size();
        txtStudentCount.setText(count + " sinh viên");

        // Update toolbar subtitle with count
        if (count > 0) {
            toolbar.setSubtitle("Chọn sinh viên để xem điểm • " + count + " sinh viên");
        } else {
            toolbar.setSubtitle("Chọn sinh viên để xem điểm");
        }

        // Show/hide empty state
        if (count == 0) {
            layoutEmpty.setVisibility(View.VISIBLE);

            // Update empty state message based on search
            TextView emptyTitle = layoutEmpty.findViewById(R.id.txtEmptyTitle);
            TextView emptyMessage = layoutEmpty.findViewById(R.id.txtEmptyMessage);

            if (!edtSearch.getText().toString().isEmpty()) {
                emptyTitle.setText("Không tìm thấy sinh viên");
                emptyMessage.setText("Không có sinh viên nào phù hợp với từ khóa tìm kiếm");
            } else {
                emptyTitle.setText("Danh sách sinh viên trống");
                emptyMessage.setText("Không có sinh viên nào trong hệ thống");
            }
        } else {
            layoutEmpty.setVisibility(View.GONE);
        }
    }

    private void loadStudents() {
        // Show loading state
        layoutEmpty.setVisibility(View.VISIBLE);
        TextView emptyTitle = layoutEmpty.findViewById(R.id.txtEmptyTitle);
        TextView emptyMessage = layoutEmpty.findViewById(R.id.txtEmptyMessage);
        emptyTitle.setText("Đang tải danh sách sinh viên...");
        emptyMessage.setText("Vui lòng chờ trong giây lát");

        // Hide other empty state views
        ImageView emptyIcon = layoutEmpty.findViewById(R.id.imgEmpty);
        if (emptyIcon != null) emptyIcon.setVisibility(View.GONE);

        ApiClient.getClient()
                .create(ApiService.class)
                .getAllStudents()
                .enqueue(new Callback<List<Student>>() {

                    @Override
                    public void onResponse(Call<List<Student>> call,
                                           Response<List<Student>> response) {

                        if (response.isSuccessful() && response.body() != null) {
                            originalList.clear();
                            originalList.addAll(response.body());

                            studentList.clear();
                            studentList.addAll(originalList);

                            adapter.notifyDataSetChanged();
                            updateUI();

                            // Show success toast if data loaded
                            if (!originalList.isEmpty()) {
                                Toast.makeText(
                                        ScoreStudentListActivity.this,
                                        "Đã tải danh sách " + originalList.size() + " sinh viên",
                                        Toast.LENGTH_SHORT
                                ).show();
                            }
                        } else {
                            showErrorState("Không có dữ liệu",
                                    "Không thể tải danh sách sinh viên");
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Student>> call, Throwable t) {
                        showErrorState("Lỗi kết nối",
                                "Không thể kết nối đến server. Vui lòng thử lại");
                    }
                });
    }

    private void showErrorState(String title, String message) {
        layoutEmpty.setVisibility(View.VISIBLE);
        TextView emptyTitle = layoutEmpty.findViewById(R.id.txtEmptyTitle);
        TextView emptyMessage = layoutEmpty.findViewById(R.id.txtEmptyMessage);
        ImageView emptyIcon = layoutEmpty.findViewById(R.id.imgEmpty);

        if (emptyTitle != null) emptyTitle.setText(title);
        if (emptyMessage != null) emptyMessage.setText(message);
        if (emptyIcon != null) {
            emptyIcon.setVisibility(View.VISIBLE);
            emptyIcon.setImageResource(R.drawable.ic_error);
        }

        // Add retry button
        View retryButton = layoutEmpty.findViewById(R.id.btnRetry);
        if (retryButton != null) {
            retryButton.setVisibility(View.VISIBLE);
            retryButton.setOnClickListener(v -> loadStudents());
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Refresh data when coming back from score screen
        if (!originalList.isEmpty()) {
            updateUI();
        }
    }
}