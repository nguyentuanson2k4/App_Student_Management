package com.example.appstudentmanagement.adapter;

import android.content.*;
import android.view.*;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.appstudentmanagement.*;
import com.example.appstudentmanagement.model.Student;
import com.google.android.material.imageview.ShapeableImageView;

import java.util.ArrayList;
import java.util.List;

public class StudentAdapter extends RecyclerView.Adapter<StudentAdapter.ViewHolder> {

    private Context context;
    private List<Student> list; // danh sách hiển thị
    private List<Student> fullList; // danh sách gốc để search
    private Class<?> targetActivity;

    public StudentAdapter(Context context, List<Student> list, Class<?> targetActivity) {
        this.context = context;
        this.list = list;
        this.targetActivity = targetActivity;
        this.fullList = new ArrayList<>(list);
    }

    public void setData(List<Student> newList) {
        list.clear();
        list.addAll(newList);

        fullList.clear();
        fullList.addAll(newList);

        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context)
                .inflate(R.layout.item_student, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int position) {
        Student s = list.get(position);
        h.txtName.setText(s.getName());
        h.txtCode.setText(s.getStudentCode());

        // Map gender
        String gender = mapGender(s.getGender());
        h.txtGender.setText(gender);

        // Email
        String email = s.getEmail();
        if (email != null && email.length() > 20) {
            email = email.substring(0, 20) + "...";
        }
        h.txtEmail.setText(email != null ? email : "Chưa có email");

        // Load avatar
        if (s.getAvatarUrl() != null && !s.getAvatarUrl().isEmpty()) {
            Glide.with(context)
                    .load(s.getAvatarUrl())
                    .placeholder(R.drawable.avatar_default)
                    .error(R.drawable.avatar_default)
                    .circleCrop()
                    .into(h.imgAvatar);
        } else {
            h.imgAvatar.setImageResource(R.drawable.avatar_default);
        }

        // CLICK ĐẾN CHI TIẾT
        h.itemView.setOnClickListener(v -> {
            Intent i = new Intent(context, targetActivity);
            i.putExtra("student_code", s.getStudentCode());
            i.putExtra("student_name", s.getName());
            context.startActivity(i);
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    private String mapGender(String g) {
        if (g == null) return "Không rõ";
        switch (g) {
            case "M": return "Nam";
            case "F": return "Nữ";
            case "O": return "Khác";
            default: return g;
        }
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        ShapeableImageView imgAvatar;
        TextView txtName, txtCode, txtGender, txtEmail;

        ViewHolder(View v) {
            super(v);
            imgAvatar = v.findViewById(R.id.imgAvatar);
            txtName = v.findViewById(R.id.txtName);
            txtCode = v.findViewById(R.id.txtCode);
            txtGender = v.findViewById(R.id.txtGender);
            txtEmail = v.findViewById(R.id.txtEmail);
        }
    }

    // SEARCH SINH VIÊN
    public void filter(String key) {
        key = key.toLowerCase().trim();
        list.clear();

        if (key.isEmpty()) {
            list.addAll(fullList);
        } else {
            for (Student s : fullList) {
                String name = s.getName() == null ? "" : s.getName().toLowerCase();
                String code = s.getStudentCode() == null ? "" : s.getStudentCode().toLowerCase();
                String email = s.getEmail() == null ? "" : s.getEmail().toLowerCase();

                if (name.contains(key) || code.contains(key) || email.contains(key)) {
                    list.add(s);
                }
            }
        }
        notifyDataSetChanged();
    }
}