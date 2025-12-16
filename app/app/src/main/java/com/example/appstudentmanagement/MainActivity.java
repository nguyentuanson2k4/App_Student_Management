package com.example.appstudentmanagement;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private EditText edtSearch;
    private Button btnSearch;
    private RecyclerView recyclerStudents;

    private ApiService apiService;
    private StudentAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // 🔥 ÁNH XẠ VIEW
        edtSearch = findViewById(R.id.edtSearch);
        btnSearch = findViewById(R.id.btnSearch);
        recyclerStudents = findViewById(R.id.recyclerStudents);

        recyclerStudents.setLayoutManager(new LinearLayoutManager(this));

        apiService = ApiClient.getClient().create(ApiService.class);

        // 🔥 LOAD TẤT CẢ SINH VIÊN LẦN ĐẦU
        loadAllStudents();

        // 🔥 CLICK TÌM
        btnSearch.setOnClickListener(v -> searchStudent());
    }

    private void loadAllStudents() {
        apiService.getAllStudents().enqueue(new Callback<List<Student>>() {
            @Override
            public void onResponse(Call<List<Student>> call,
                                   Response<List<Student>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    adapter = new StudentAdapter(MainActivity.this, response.body());
                    recyclerStudents.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<List<Student>> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Không tải được danh sách sinh viên", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void searchStudent() {
        String code = edtSearch.getText().toString().trim();

        if (code.isEmpty()) {
            loadAllStudents();
            return;
        }

        apiService.getStudentByCode(code).enqueue(new Callback<Student>() {
            @Override
            public void onResponse(Call<Student> call,
                                   Response<Student> response) {

                if (response.isSuccessful() && response.body() != null) {
                    List<Student> list = new ArrayList<>();
                    list.add(response.body());
                    adapter = new StudentAdapter(MainActivity.this, list);
                    recyclerStudents.setAdapter(adapter);
                } else {
                    Toast.makeText(MainActivity.this,
                            "Không tìm thấy sinh viên", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Student> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Lỗi kết nối API", Toast.LENGTH_SHORT).show();
            }
        });


    }
}
